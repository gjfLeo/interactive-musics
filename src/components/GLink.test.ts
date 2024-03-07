import { RouterLinkStub, mount } from "@vue/test-utils";

import GLink from "./GLink.vue";

const stubs = {
  RouterLink: RouterLinkStub,
};

describe("gLink", () => {
  it("链接文字", () => {
    const wrapper = mount(GLink, {
      slots: {
        default: "Link Text",
      },
      global: { stubs },
    });
    expect(wrapper.text()).toContain("Link Text");
  });
  it("链接跳转", () => {
    const wrapper = mount(GLink, {
      props: {
        href: "https://www.baidu.com",
      },
      global: { stubs },
    });
    expect(wrapper.attributes().href).toEqual("https://www.baidu.com");
  });
});
