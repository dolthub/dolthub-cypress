import { testNavbarMenus } from "@sharedTests/navbarMenus";

describe("Signed-in DoltHub navbar", () => {
  testNavbarMenus("/profile", true);
});
