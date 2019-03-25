import styled from "styled-components";

import { MathInput } from "@edulastic/common";

export const MathAnswer = styled(MathInput)`
  .input {
    height: 40px;

    &__math {
      min-height: 40px;
      height: 40px;
      padding: 10px;
    }

    &__absolute {
      &__keyboard {
        left: unset;
        top: 50px;
        width: 244px;

        .keyboard {
          &__main {
            flex-direction: column;

            .half-box {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
