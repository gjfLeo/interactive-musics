import type { IMAlbum } from "../types";

const albums: IMAlbum[] = [
  (await import("./20220413 佚落迁忘之岛")).default,
  (await import("./20220622 千岩旷望")).default,
];

export default albums;
