import { v4 as uuidv4 } from "uuid";

export enum EventType {
  STAMPIN = "STAMPIN",
  STAMPOUT = "STAMPOUT",
  INTERMEDIATE = "INTERMEDIATE",
}

export class DateTimeFragmented {
  public readonly fullYear: string;
  public readonly fullMonth: string;
  public readonly fullDay: string;
  public readonly fullHour: string;
  public readonly fullMinute: string;
  public readonly ISO: string;
  public readonly timestamp: number;
  public differenceToPrevious: number | null = null;
  constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly day: number,
    public readonly hour: number,
    public readonly minute: number
  ) {
    this.fullYear = `${year}`;
    this.fullMonth = `0${month}`.slice(-2);
    this.fullDay = `0${day}`.slice(-2);
    this.fullHour = `0${hour}`.slice(-2);
    this.fullMinute = `0${minute}`.slice(-2);
    this.ISO = `${year}-${this.fullMonth}-${this.fullDay}`;
    this.timestamp =
      new Date(year, month - 1, day, hour, minute).getTime() / 60000;
  }
  compare(other: DateTimeFragmented) {
    if (this.year !== other.year) return this.year - other.year;
    if (this.month !== other.month) return this.month - other.month;
    if (this.day !== other.day) return this.day - other.day;
    if (this.hour !== other.hour) return this.hour - other.hour;
    return this.minute - other.minute;
  }
}

export class DateTimeFragmentedUtil {
  static createFromDate = (date: Date): DateTimeFragmented =>
    new DateTimeFragmented(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );
  static createWithNow = (): DateTimeFragmented => {
    return this.createFromDate(new Date());
  };
  static sort(dateTimeFragments: DateTimeFragmented[]) {
    return dateTimeFragments.sort((a, b) => a.compare(b));
  }
}

export class DateEvent {
  public readonly type: EventType;
  public readonly date: DateTimeFragmented;
  public readonly id: string;
  constructor(type: EventType, date?: DateTimeFragmented, id?: string) {
    this.type = type;
    this.date = date || DateTimeFragmentedUtil.createWithNow();
    this.id = id || uuidv4();
  }

  static sort(dateEvents: DateEvent[]) {
    return dateEvents.sort((a, b) => a.date.compare(b.date));
  }

  static calculateDifferences(events: DateEvent[]) {
    for (let i = 0; i < events.length - 1; i++) {
      const a = events[i];
      const b = events[i + 1];
      if (a.type !== EventType.STAMPOUT && b.type !== EventType.STAMPIN) {
        //if (a.type === EventType.STAMPIN && b.type === EventType.STAMPOUT) {
        b.date.differenceToPrevious = b.date.timestamp - a.date.timestamp;
      } else {
        b.date.differenceToPrevious = null;
      }
    }
  }
}
