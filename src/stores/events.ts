import { defineStore } from "pinia";
import { DateTimeFragmented, EventType } from "@/models/models";
import { DateEvent } from "@/models/models";
import Util from "@/util/util";

export const useEventsStore = defineStore("events", {
  state: () => ({
    events: [] as DateEvent[],
    isWorking: false,
    date: Util.formatToYYYYMMDD(new Date()) as string,
  }),
  getters: {
    getEntriesForDate: (state) => {
      const entries = state.events.filter((e) => e.date.ISO === state.date);
      DateEvent.calculateDifferences(entries);
      return entries;
    },
    getEntryById: (state) => {
      return (id: string) => state.events.find((e) => e.id === id);
    },
    getTotalTime() {
      let sum = 0;
      this.getEntriesForDate.forEach((e) => {
        sum += e.date.differenceToPrevious || 0;
      });
      return sum;
    },
  },
  actions: {
    toggleWorking() {
      if (this.isWorking) {
        this.events.push(new DateEvent(EventType.STAMPOUT));
      } else {
        this.events.push(new DateEvent(EventType.STAMPIN));
      }
      this.events = DateEvent.sort(this.events);
      this.isWorking = !this.isWorking;
      this.persist();
    },
    addEvent(type: EventType) {
      this.events.push(new DateEvent(type));
    },
    shuffle() {
      this.events = this.events.sort(() => Math.random() - 0.5);
    },
    persist() {
      localStorage.setItem("events", JSON.stringify(this.events));
      localStorage.setItem("isWorking", JSON.stringify(this.isWorking));
    },
    loadFromStorage() {
      // Events
      const tmpEvents = JSON.parse(localStorage.getItem("events") || "[]");
      // every DateEvent has to be initialized as one. otherwise it will just be a JS object wihtout the functionality
      for (let i = 0; i < tmpEvents.length; i++) {
        const tmpEvent = tmpEvents[i];
        this.events.push(
          new DateEvent(
            tmpEvent.type,
            new DateTimeFragmented(
              tmpEvent.date.year,
              tmpEvent.date.month,
              tmpEvent.date.day,
              tmpEvent.date.hour,
              tmpEvent.date.minute
            ),
            tmpEvent.id
          )
        );
      }

      this.isWorking = JSON.parse(localStorage.getItem("isWorking") || "false");
    },
    clearStorage() {
      this.events = [] as DateEvent[];
      this.isWorking = false;
      localStorage.removeItem("events");
      localStorage.removeItem("isWorking");
    },
  },
});
