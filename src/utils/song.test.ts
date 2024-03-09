import { getTrackSrc } from "./song";

describe("getTrackSrc", () => {
  it("返回网易云直链", () => {
    const links = { ne: 1956543019 };
    expect(getTrackSrc(links)).toBe("https://music.163.com/song/media/outer/url?id=1956543019");
  });

  it("返回Fandom资源文件", () => {
    const links = { fandom: "Mystic_Onmyou_Chamber_Against_the_Invisible_Net_Var.ogg" };
    expect(getTrackSrc(links)).toBe("https://static.wikia.nocookie.net/gensin-impact/images/0/00/Mystic_Onmyou_Chamber_Against_the_Invisible_Net_Var.ogg");
  });

  it("报错", () => {
    const links = {};
    expect(getTrackSrc(links)).toThrow("没有可用的音频资源");
  });
});
