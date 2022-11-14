import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuyTicket from ".././screens/ticket/BuyTicket";

configure({ adapter: new Adapter() });
it("buy ticket ", () => {
  shallow(<BuyTicket />);
});
