import React from "react";

import WidgetOptions from "../../../containers/WidgetOptions";
import { Block } from "../../../styled/WidgetOptions/Block";

import Extras from "../../../containers/Extras";

const Options = () => (
  <WidgetOptions>
    <Block>
      <Extras>
        <Extras.Distractors />
        <Extras.Hints />
      </Extras>
    </Block>
  </WidgetOptions>
);

export default Options;
