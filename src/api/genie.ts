import { dateTimeStrings, splitDateTime } from '@/datetime';
import { fetchJson } from '@/fetch';
import { AuthStore } from './auth/store';
import { avatarUrl } from './avatar';

const ORIGIN_TO_RESORT = {
  'https://disneyworld.disney.go.com': 'WDW',
  'https://disneyland.disney.go.com': 'DLR',
} as const;

const RESORT_TO_ITINERARY_API_NAME = {
  WDW: 'wdw-itinerary-api',
  DLR: 'dlr-itinerary-web-api',
} as const;

export type Origin = keyof typeof ORIGIN_TO_RESORT;

export function isGenieOrigin(origin: string): origin is Origin {
  return origin in ORIGIN_TO_RESORT;
}

export interface Experience {
  id: string;
  name: string;
  geo: readonly [number, number];
  type: 'ATTRACTION' | 'ENTERTAINMENT';
  standby: {
    available: boolean;
    unavailableReason?: 'TEMPORARILY_DOWN' | 'NOT_STANDBY_ENABLED';
    waitTime?: number;
    displayNextShowTime?: string;
  };
  additionalShowTimes?: string[];
  flex?: {
    available: boolean;
    nextAvailableTime?: string;
    enrollmentStartTime?: string;
    preexistingPlan?: boolean;
  };
  individual?: {
    available: boolean;
    displayPrice: string;
  };
  priority?: number;
  drop?: boolean;
}

export type PlusExperience = Experience & Required<Pick<Experience, 'flex'>>;

type ApiExperience = Omit<Experience, 'name' | 'priority' | 'geo' | 'drop'>;
type ApiPlusExperience = ApiExperience & Required<Pick<Experience, 'flex'>>;

interface ExperiencesResponse {
  availableExperiences: ApiExperience[];
  eligibility?: {
    flexEligibilityWindows?: {
      time: {
        time: string;
        timeDisplayString: string;
        timeStatus: string;
      };
    }[];
    guestIds: string[];
  };
}

interface GuestEligibility {
  ineligibleReason?:
    | 'INVALID_PARK_ADMISSION'
    | 'PARK_RESERVATION_NEEDED'
    | 'GENIE_PLUS_NEEDED'
    | 'EXPERIENCE_LIMIT_REACHED'
    | 'TOO_EARLY'
    | 'TOO_EARLY_FOR_PARK_HOPPING';
  eligibleAfter?: string;
}

export interface Guest extends GuestEligibility {
  id: string;
  name: string;
  avatarImageUrl?: string;
}

export interface Guests {
  eligible: Guest[];
  ineligible: Guest[];
}

interface ApiGuest extends GuestEligibility {
  id: string;
  firstName: string;
  lastName: string;
  primary: boolean;
  characterId: string;
}

interface GuestsResponse {
  guests: ApiGuest[];
  ineligibleGuests: ApiGuest[];
  primaryGuestId: string;
}

interface OfferResponse {
  offer: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    changeStatus: 'NONE' | 'CHANGED' | 'PARK_HOPPING';
    status: 'ACTIVE' | 'DELETED';
  };
  eligibleGuests: ApiGuest[];
  ineligibleGuests: ApiGuest[];
}

export interface Offer {
  id: string;
  start: DateTime;
  end: DateTime;
  active: boolean;
  changed: boolean;
  guests: {
    eligible: Guest[];
    ineligible: Guest[];
  };
}

export interface Park {
  id: string;
  name: string;
  icon: string;
  geo: { n: number; s: number; e: number; w: number };
  theme: { bg: string; text: string };
}

export interface ResortData {
  parks: Park[];
  experiences: {
    [id: string]: {
      name: string;
      geo: readonly [number, number];
      pdtMask?: number;
      priority?: number;
    };
  };
  pdts: { [id: string]: string[] };
}

export interface NewBookingResponse {
  id: 'NEW_BOOKING';
  assignmentDetails: {
    product: 'INDIVIDUAL';
    reason: 'OTHER';
  };
  startDateTime: string;
  endDateTime: string;
  entitlements: {
    id: string;
    guestId: string;
    usageDetails: {
      status: 'BOOKED';
      modifiable: boolean;
      redeemable: boolean;
    };
  }[];
  singleExperienceDetails: {
    experienceId: string;
    parkId: string;
  };
}

interface DateTime {
  date: string;
  time: string;
}

export interface BookingGuest extends Guest {
  entitlementId: string;
  redemptions?: number;
}

export interface Booking {
  experience: {
    id: string;
    name: string;
  };
  park: Park;
  start: Partial<DateTime>;
  end: Partial<DateTime>;
  cancellable: boolean;
  guests: BookingGuest[];
  choices?: Pick<Experience, 'id' | 'name'>[];
}

interface Asset {
  id: string;
  type: string;
  name: string;
  media: {
    small: {
      transcodeTemplate: string;
      url: string;
    };
  };
}

interface LocationAsset extends Asset {
  location: string;
}

interface Item {
  type: string;
  kind: string;
}

interface FastPass {
  id: string;
  type: 'FASTPASS';
  kind: 'FLEX' | 'OTHER';
  facility: string;
  assets: { content: string; excluded: boolean; original: boolean }[];
  displayStartDate?: string;
  displayStartTime?: string;
  displayEndDate?: string;
  displayEndTime?: string;
  cancellable: boolean;
  multipleExperiences: boolean;
  guests: {
    id: string;
    entitlementId: string;
    redemptionsRemaining?: number;
  }[];
}

interface Profile {
  id: string;
  name: { firstName: string; lastName: string };
  avatarId: string;
}

interface Itinerary {
  assets: { [id: string]: Asset };
  items: (Item | FastPass)[];
  profiles: { [id: string]: Profile };
}

type EventName = 'bookingChange';
type EventListener = () => void;

export class RequestError extends Error {
  name = 'RequestError';

  constructor(
    public response: Awaited<ReturnType<typeof fetchJson>>,
    message = 'Request failed'
  ) {
    super(`${message}: ${JSON.stringify(response)}`);
  }
}

const idNum = (id: string) => id.split(';')[0];

export class GenieClient {
  readonly maxPartySize = 12;
  onUnauthorized = () => undefined;
  protected origin: Origin;
  protected authStore: Public<AuthStore>;
  protected data: ResortData;
  protected guestCache = new Map<
    string,
    { name: string; characterId: string }
  >();
  protected bookingStack: BookingStack;
  protected listeners: Record<EventName, Set<EventListener>> = {
    bookingChange: new Set(),
  };
  protected _primaryGuestId = '';

  static async load(
    args: Omit<ConstructorParameters<typeof GenieClient>[0], 'data'>
  ) {
    const resort = ORIGIN_TO_RESORT[args.origin].toLowerCase();
    const data = (await import(`./data/${resort}.ts`)).default;
    return new GenieClient({ ...args, data });
  }

  constructor(args: {
    origin: GenieClient['origin'];
    authStore: GenieClient['authStore'];
    data: GenieClient['data'];
  }) {
    this.origin = args.origin;
    this.authStore = args.authStore;
    this.data = args.data;
    this.bookingStack = new BookingStack();
  }

  get resort() {
    return ORIGIN_TO_RESORT[this.origin];
  }

  get parks() {
    return this.data.parks;
  }

  async experiences(park: Pick<Park, 'id'>): Promise<{
    plus: PlusExperience[];
    nextBookTime?: string;
  }> {
    await this.primaryGuestId(); // prime the guest cache
    const res: ExperiencesResponse = await this.request({
      path: `/tipboard-vas/api/v1/parks/${encodeURIComponent(
        park.id
      )}/experiences`,
      params: { eligibilityGuestIds: [...this.guestCache.keys()].join(',') },
    });
    const nextBookTime = (res.eligibility?.flexEligibilityWindows || []).sort(
      (a, b) => a.time.time.localeCompare(b.time.time)
    )[0]?.time.time;
    const pdt = this.nextDropTime(park);
    const pdtIdx = (this.data.pdts[park.id] || []).indexOf(pdt || '');
    const pdtBit = 1 << pdtIdx;
    return {
      plus: res.availableExperiences
        .filter(
          (exp): exp is ApiPlusExperience =>
            !!exp.flex && exp.id in this.data.experiences
        )
        .map(exp => {
          const { pdtMask = 0, ...expData } = this.data.experiences[exp.id];
          const e: PlusExperience = {
            ...exp,
            ...expData,
            drop: !!(pdtBit & pdtMask),
          };
          return e;
        }),
      nextBookTime,
    };
  }

  async guests(args?: {
    experience: Pick<Experience, 'id'>;
    park: Pick<Park, 'id'>;
  }): Promise<Guests> {
    args ||= { experience: { id: '0' }, park: { id: '0' } };
    const res: GuestsResponse = await this.request({
      path: '/ea-vas/api/v1/guests',
      params: {
        productType: 'FLEX',
        experienceId: args.experience.id,
        parkId: args.park.id,
      },
    });
    this._primaryGuestId = res.primaryGuestId;
    const ineligible = res.ineligibleGuests.map(this.convertGuest);
    const eligible = res.guests
      .map(this.convertGuest)
      .filter(g => !('ineligibleReason' in g) || (ineligible.push(g) && false));
    ineligible.sort((a, b) => {
      const cmp = +!a.primary - +!b.primary || a.name.localeCompare(b.name);
      if (a.eligibleAfter || b.eligibleAfter) {
        return (
          (a.eligibleAfter || '99').localeCompare(b.eligibleAfter || '99') ||
          cmp
        );
      }
      if (a.ineligibleReason === b.ineligibleReason) return cmp;
      if (a.ineligibleReason === 'EXPERIENCE_LIMIT_REACHED') return -1;
      if (b.ineligibleReason === 'EXPERIENCE_LIMIT_REACHED') return 1;
      return cmp;
    });
    return { eligible, ineligible };
  }

  async primaryGuestId(args?: Parameters<GenieClient['guests']>[0]) {
    if (!this._primaryGuestId) await this.guests(args);
    return this._primaryGuestId;
  }

  async offer({
    experience,
    park,
    guests,
  }: {
    experience: Pick<PlusExperience, 'id' | 'flex'>;
    park: Pick<Park, 'id'>;
    guests: Pick<Guest, 'id'>[];
  }): Promise<Offer> {
    const res: OfferResponse = await this.request({
      path: '/ea-vas/api/v2/products/flex/offers',
      method: 'POST',
      data: {
        guestIds: guests.map(g => g.id),
        ineligibleGuests: [],
        primaryGuestId: await this.primaryGuestId({ experience, park }),
        parkId: park.id,
        experienceId: experience.id,
        selectedTime: experience.flex.nextAvailableTime,
      },
      userId: false,
    });
    const { id, date, startTime, endTime, status, changeStatus } = res.offer;
    return {
      id,
      start: { date, time: startTime },
      end: { date, time: endTime },
      active: status === 'ACTIVE',
      changed: changeStatus !== 'NONE',
      guests: {
        eligible: (res.eligibleGuests || []).map(this.convertGuest),
        ineligible: (res.ineligibleGuests || []).map(this.convertGuest),
      },
    };
  }

  async cancelOffer(offer: Pick<Offer, 'id'>) {
    await this.request({
      path: `/ea-vas/api/v1/offers/${encodeURIComponent(offer.id)}`,
      method: 'DELETE',
      params: {
        productType: 'FLEX',
      },
      userId: false,
    });
  }

  async book(offer: Pick<Offer, 'id'>): Promise<Booking> {
    const {
      singleExperienceDetails: { experienceId, parkId },
      entitlements,
      startDateTime,
      endDateTime,
    }: NewBookingResponse = await this.request({
      path: `/ea-vas/api/v1/products/flex/bookings`,
      method: 'POST',
      userId: false,
      data: { offerId: offer.id },
      key: 'booking',
    });
    this.bookings(); // Load bookings to refresh booking stack
    return {
      experience: {
        id: experienceId,
        name: this.data.experiences[experienceId].name,
      },
      park: this.data.parks.find(p => p.id === parkId) as Park,
      start: splitDateTime(startDateTime),
      end: splitDateTime(endDateTime),
      cancellable: true,
      guests: entitlements.map(e => {
        const g = this.guestCache.get(e.guestId);
        return {
          id: e.guestId,
          name: g?.name || '',
          avatarImageUrl: avatarUrl(g?.characterId),
          entitlementId: e.id,
        };
      }),
    };
  }

  async cancelBooking(
    guests: Pick<BookingGuest, 'entitlementId'>[]
  ): Promise<void> {
    const ids = guests.map(g => g.entitlementId);
    const idParam = ids.map(encodeURIComponent).join(',');
    await this.request({
      path: `/ea-vas/api/v1/entitlements/${idParam}`,
      method: 'DELETE',
      userId: false,
    });
  }

  async bookings(): Promise<Booking[]> {
    const { swid } = this.authStore.getData();
    const now = new Date(Date.now());
    const itineraryApiName = RESORT_TO_ITINERARY_API_NAME[this.resort];
    const {
      items = [],
      assets = {},
      profiles = {},
    } = (await this.request({
      path: `/plan/${itineraryApiName}/api/v1/itinerary-items/${swid}`,
      params: {
        destination: this.resort,
        fields: 'items,profiles,assets',
        'item-types': 'FASTPASS',
        'guest-locators': swid + ';type=swid',
        'guest-locator-groups': 'MY_FAMILY',
        'start-date': dateTimeStrings(now).date,
        'end-date': dateTimeStrings(
          new Date(now.getTime()).setDate(now.getDate() + 1)
        ).date,
        'show-friends': 'false',
      },
      userId: false,
    })) as Itinerary;
    const parkMap = Object.fromEntries(this.parks.map(p => [p.id, p]));
    const earliest = dateTimeStrings(
      new Date(now.getTime()).setMinutes(now.getMinutes() - 15)
    );
    const types = new Set(['FLEX', 'OTHER']);
    const bookings = items
      .filter(
        (item): item is FastPass =>
          item.type === 'FASTPASS' && types.has(item.kind)
      )
      .filter(
        fp =>
          (fp.displayEndDate || '9999') > earliest.date ||
          (fp.displayEndDate === earliest.date &&
            (fp.displayEndTime || '24') >= earliest.time)
      )
      .map(fp => {
        const id = idNum(fp.facility);
        const expAsset = assets[fp.facility] as LocationAsset;
        const { name } = this.data.experiences[id] || expAsset;
        const parkId = idNum(expAsset.location);
        const booking: Booking = {
          experience: { id, name },
          park: parkMap[parkId],
          start: {
            date: fp.displayStartDate,
            time: fp.displayStartTime,
          },
          end: {
            date: fp.displayEndDate,
            time: fp.displayEndTime,
          },
          cancellable: fp.cancellable,
          guests: fp.guests.map(g => {
            const { name, avatarId } = profiles[g.id];
            const id = idNum(g.id);
            const guest: BookingGuest = {
              id,
              entitlementId: g.entitlementId,
              name: `${name.firstName} ${name.lastName}`.trim(),
              avatarImageUrl: avatarUrl(avatarId),
              ...(g.redemptionsRemaining !== undefined && {
                redemptions: g.redemptionsRemaining,
              }),
            };
            return guest;
          }),
        };
        if (fp.multipleExperiences) {
          booking.experience = { id: '', name: 'Multiple Experiences' };
          booking.choices = fp.assets
            .filter(a => !a.excluded && !a.original)
            .map(({ content }) => {
              const id = idNum(content);
              const { name } = this.data.experiences[id] || assets[content];
              return { id, name };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
        }
        return booking;
      })
      .sort((a, b) =>
        ((a.start.date || '0000-00-00') + (a.start.time || '')).localeCompare(
          (b.start.date || '0000-00-00') + (b.start.time || '')
        )
      );
    this.bookingStack.update(bookings);
    return bookings;
  }

  isRebookable(booking: Booking): boolean {
    return this.bookingStack.isRebookable(booking);
  }

  nextDropTime(park: Pick<Park, 'id'>): string | undefined {
    const now = dateTimeStrings().time.slice(0, 5);
    return this.data.pdts?.[park.id]?.find(pdt => pdt >= now);
  }

  logOut(): void {
    this.authStore.deleteData();
    this.onUnauthorized();
  }

  protected convertGuest = (guest: ApiGuest) => {
    const { id, firstName, lastName, characterId, ...rest } = guest;
    const name = `${firstName} ${lastName}`.trim();
    if (!this.guestCache.has(id)) {
      switch (guest.ineligibleReason) {
        case 'INVALID_PARK_ADMISSION':
        case 'PARK_RESERVATION_NEEDED':
        case 'GENIE_PLUS_NEEDED':
          if (guest.primary) this.cacheGuest(id, name, characterId);
          break;
        default:
          this.cacheGuest(id, name, characterId);
      }
    }
    const avatarImageUrl = avatarUrl(characterId);
    return { ...rest, id, name, avatarImageUrl };
  };

  protected cacheGuest(id: string, name: string, characterId: string) {
    this.guestCache.set(id, { name, characterId });
  }

  protected async request(request: {
    path: string;
    method?: 'GET' | 'POST' | 'DELETE';
    params?: { [key: string]: string };
    data?: unknown;
    key?: string;
    userId?: boolean;
  }): Promise<any> {
    const { swid, accessToken } = this.authStore.getData();
    const url = this.origin + request.path;
    const params = { ...request.params };
    if (request.userId ?? true) params.userId = swid;
    const { status, data } = await fetchJson(url, {
      method: request.method || 'GET',
      params,
      data: request.data,
      headers: {
        Authorization: `BEARER ${accessToken}`,
        'x-user-id': swid,
      },
    });
    if (status === 401) {
      setTimeout(() => this.logOut());
    } else {
      const { key } = request;
      if (String(status)[0] === '2' && (!key || data[key])) {
        return key ? data[key] : data;
      }
    }
    throw new RequestError({ status, data });
  }
}

export const BOOKINGS_KEY = 'bg1.genie.bookings';

interface BookingStackData {
  entitlementIds: string[];
  mostRecent: { [guestId: string]: string };
}

export class BookingStack {
  protected entitlementIds: string[] = [];
  protected mostRecent: Map<string, string> = new Map();

  constructor(loadFromStorage = true) {
    if (!loadFromStorage) return;
    const { entitlementIds = [], mostRecent = {} } = JSON.parse(
      localStorage.getItem(BOOKINGS_KEY) || '{}'
    ) as BookingStackData;
    this.entitlementIds = entitlementIds;
    this.mostRecent = new Map(Object.entries(mostRecent));
  }

  isRebookable(booking: Booking): boolean {
    return booking.guests.every(
      g => this.mostRecent.get(g.id) === g.entitlementId
    );
  }

  update(bookings: Booking[]): void {
    const mostRecent = new Map<string, string>();
    const oldEntIds = new Set(this.entitlementIds);
    this.entitlementIds = bookings
      .filter(({ cancellable }) => cancellable)
      .map(booking =>
        booking.guests.map(({ id, entitlementId }) => {
          this.entitlementIds.push(entitlementId);
          if (!oldEntIds.has(entitlementId)) {
            mostRecent.set(id, mostRecent.has(id) ? '' : entitlementId);
          }
          return entitlementId;
        })
      )
      .flat(1);
    this.mostRecent = new Map([...this.mostRecent, ...mostRecent]);
    if (mostRecent.size > 0) {
      localStorage.setItem(
        BOOKINGS_KEY,
        JSON.stringify({
          entitlementIds: this.entitlementIds,
          mostRecent: Object.fromEntries(this.mostRecent),
        } as BookingStackData)
      );
    }
  }
}
