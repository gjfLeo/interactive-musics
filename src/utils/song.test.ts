import { getTrackSrc } from "./song";

describe("getTrackSrc", () => {
  it("should return the correct track source URL", () => {
    const links = { ne: 1956543019 };
    expect(getTrackSrc(links)).toBe("https://music.163.com/song/media/outer/url?id=1956543019");
  });
});
