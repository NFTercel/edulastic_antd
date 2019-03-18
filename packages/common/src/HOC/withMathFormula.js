import React from "react";
import styled from "styled-components";
import { cloneDeep } from "lodash";

import { WithResources } from "@edulastic/common";

export const withMathFormula = WrappedComponent => {
  const NoneDiv = styled.div`
    display: none;
  `;
  const StyledWrappedComponent = styled(WrappedComponent)`
    p {
      display: inline;
    }
  `;
  return class extends React.Component {
    state = {
      MQ: null,
      mathField: null,
      latexHtmls: [],
      latexes: [],
      mathHtmls: [],
      newInnerHtml: ""
    };

    mathFieldRef = React.createRef();

    componentDidUpdate(prevProps) {
      const { dangerouslySetInnerHTML } = this.props;
      if (
        dangerouslySetInnerHTML !== undefined &&
        prevProps.dangerouslySetInnerHTML.__html !== dangerouslySetInnerHTML.__html
      ) {
        const { latexHtmls, latexes } = this.detectLatexes(this.props);
        const mathHtmls = this.convertLatexesToMathHtmls(latexes);
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          latexHtmls,
          latexes,
          mathHtmls,
          newInnerHtml: this.generateNewHtml(dangerouslySetInnerHTML.__html, latexHtmls, mathHtmls)
        });
      }
    }

    detectLatexes = props => {
      const { dangerouslySetInnerHTML } = props;
      if (!dangerouslySetInnerHTML || !dangerouslySetInnerHTML.__html) {
        return {
          latexHtmls: [],
          latexes: []
        };
      }
      const mathRegex = /<span class="input__math" data-latex="([^"]+)"><\/span>/g;
      const latexHtmls = dangerouslySetInnerHTML.__html.match(mathRegex);
      if (!latexHtmls) {
        return {
          latexHtmls: [],
          latexes: []
        };
      }
      const latexes = latexHtmls.map(html => {
        const mathRegex2 = /<span class="input__math" data-latex="([^"]+)"><\/span>/g;
        const matches = mathRegex2.exec(html);
        if (matches && matches[1]) {
          return matches[1];
        }
        return null;
      });
      return {
        latexHtmls,
        latexes
      };
    };

    generateNewHtml = (prevHtml, latexHtmls, mathHtmls) => {
      let newInnerHtml = cloneDeep(prevHtml);
      for (let i = 0; i < latexHtmls.length; i++) {
        newInnerHtml = newInnerHtml.replace(latexHtmls[i], mathHtmls[i]);
      }
      return newInnerHtml;
    };

    componentDidMount() {
      const { dangerouslySetInnerHTML } = this.props;
      if (!window.MathQuill && dangerouslySetInnerHTML !== undefined) {
        this.setState({
          newInnerHtml: dangerouslySetInnerHTML.__html
        });
        return;
      }
      this.startMathValidating();
    }

    startMathValidating() {
      const { dangerouslySetInnerHTML } = this.props;

      if (dangerouslySetInnerHTML !== undefined) {
        const MQ = window.MathQuill.getInterface(2);
        const mathField = MQ.StaticMath(this.mathFieldRef.current);
        const { latexHtmls, latexes } = this.detectLatexes(this.props);
        this.setState(
          {
            MQ,
            mathField,
            latexHtmls,
            latexes
          },
          () => {
            const mathHtmls = this.convertLatexesToMathHtmls(latexes);
            this.setState({
              mathHtmls,
              newInnerHtml: this.generateNewHtml(dangerouslySetInnerHTML.__html, latexHtmls, mathHtmls)
            });
          }
        );
      }
    }

    convertLatexesToMathHtmls(latexes) {
      return latexes.map(latex => this.convertLatexToHTML(latex));
    }

    convertLatexToHTML(latex) {
      const { mathField } = this.state;
      if (!mathField) return latex;
      mathField.latex(latex);
      return `<span class="input__math" data-latex="${latex}">${this.mathFieldRef.current.outerHTML}</span>`;
    }

    render() {
      const { newInnerHtml } = this.state;
      return (
        <WithResources
          resources={[
            "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css",
            "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js",
            "https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js",
            "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.css"
          ]}
          fallBack={<h2>Loading...</h2>}
          onLoaded={() => this.startMathValidating()}
          dangerouslySetInnerHTML={{ __html: newInnerHtml }}
        >
          <React.Fragment>
            <StyledWrappedComponent {...this.props} />
            <NoneDiv>
              <span ref={this.mathFieldRef} className="input__math__field" />
            </NoneDiv>
          </React.Fragment>
        </WithResources>
      );
    }
  };
};
