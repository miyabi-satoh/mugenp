import { Term } from "~/utils/expression";

describe("class Term", () => {
  describe("constructor", () => {
    test("(0) => 0", () => {
      const expr = new Term(0);
      expect(expr.toString()).toBe("0");
    });

    test("(1,2) => 0.5", () => {
      const expr = new Term(1, 2);
      expect(expr.toString()).toBe("0.5");
    });

    test("(1,3) => 0.(3)", () => {
      let expr = new Term(1, 3);
      expect(expr.toString()).toBe("0.(3)");
    });

    test("(2, 'x') => 2x", () => {
      const expr = new Term(2, "x");
      expect(expr.toString()).toBe("2x");
    });

    test("(2, 'xy') => 2x y", () => {
      const expr = new Term(2, "xy");
      expect(expr.toString()).toBe("2x y");
    });

    test("(2, 'x^{2}y') => 2x^{2} y", () => {
      const expr = new Term(2, "x^{2}y");
      expect(expr.toString()).toBe("2x^{2} y");
    });

    test("(2, 'xy^{2}') => 2x y^{2}", () => {
      const expr = new Term(2, "xy^{2}");
      expect(expr.toString()).toBe("2x y^{2}");
    });

    test("(2, 'x^{2}y^{1}') => 2x^{2} y", () => {
      const expr = new Term(2, "x^{2}y^{1}");
      expect(expr.toString()).toBe("2x^{2} y");
    });

    test("(2, 'y^{2}x^{1}') => 2x y^{2}", () => {
      const expr = new Term(2, "y^{2}x^{1}");
      expect(expr.toString()).toBe("2x y^{2}");
    });

    test("(2, 'x^{0}y^{1}') => 2y", () => {
      const expr = new Term(2, "x^{0}y^{1}");
      expect(expr.toString()).toBe("2y");
    });

    test("(1, 'x^{0}y^{1}') => y", () => {
      const expr = new Term(1, "x^{0}y^{1}");
      expect(expr.toString()).toBe("y");
    });

    test("(-1, 'x^{0}y^{1}') => -y", () => {
      const expr = new Term(-1, "x^{0}y^{1}");
      expect(expr.toString()).toBe("-y");
    });

    test("(0, 'x^{0}y^{1}') => 0", () => {
      const expr = new Term(0, "x^{0}y^{1}");
      expect(expr.toString()).toBe("0");
    });

    test("(1, '\\pi') => \\pi", () => {
      const expr = new Term(1, "\\pi");
      expect(expr.toString()).toBe("\\pi");
    });

    test("(4, '\\pi r^{2}') => 4\\pi r^{2}", () => {
      const expr = new Term(4, "\\pi r^{2}");
      expect(expr.toString()).toBe("4\\pi r^{2}");
    });

    test("(4, 'r^{2}\\pi') => 4\\pi r^{2}", () => {
      const expr = new Term(4, "r^{2}\\pi");
      expect(expr.toString()).toBe("4\\pi r^{2}");
    });
  });

  describe("abs()", () => {
    test("abs(0) => 0", () => {
      const expr = new Term(0, "");
      expect(expr.abs().toString()).toBe("0");
    });

    test("abs(1) => 1", () => {
      const expr = new Term(1, "");
      expect(expr.abs().toString()).toBe("1");
    });

    test("abs(-1) => 1", () => {
      const expr = new Term(-1, "");
      expect(expr.abs().toString()).toBe("1");
    });
  });

  describe("neg()", () => {
    test("neg(0) => 0", () => {
      const expr = new Term(0, "");
      expect(expr.neg().toString()).toBe("0");
    });

    test("neg(1) => -1", () => {
      const expr = new Term(1, "");
      expect(expr.neg().toString()).toBe("-1");
    });

    test("neg(-1) => 1", () => {
      const expr = new Term(-1, "");
      expect(expr.neg().toString()).toBe("1");
    });
  });

  describe("mul()", () => {
    test("mul(0) => 0", () => {
      const expr = new Term(2, "x");
      const x = new Term(0);
      expect(expr.mul(x).toString()).toBe("0");
    });

    test("mul(2yx) => 4x^{2}y", () => {
      const expr = new Term(2, "x");
      const x = new Term(2, "yx");
      expect(expr.mul(x).toString()).toBe("4x^{2} y");
    });
  });

  describe("div()", () => {
    test("div(2yx) => 4x^{2}y", () => {
      const expr = new Term(8, "x^{3}y^{2}");
      const x = new Term(2, "yx");
      expect(expr.div(x).toString()).toBe("4x^{2} y");
    });
  });

  describe("pow()", () => {
    test("pow(3) => 27x^{9} y^{6}", () => {
      const expr = new Term(3, "x^{3}y^{2}");
      expect(expr.pow(3).toString()).toBe("27x^{9} y^{6}");
    });
    test("pow(-3) => \\frac{1}{27}x^{-9} y^{-6}", () => {
      const expr = new Term(3, "x^{3}y^{2}");
      expect(expr.pow(-3).toLatex()).toBe("\\frac{1}{27} x^{-9} y^{-6}");
    });
    test("pow(1) => 3x^{3}y^{2}", () => {
      const expr = new Term(3, "x^{3}y^{2}");
      expect(expr.pow(1).toString()).toBe("3x^{3} y^{2}");
    });
    test("pow(-1) => \\frac{1}{3}x^{-3} y^{-2}", () => {
      const expr = new Term(3, "x^{3}y^{2}");
      expect(expr.pow(-1).toLatex()).toBe("\\frac{1}{3} x^{-3} y^{-2}");
    });
    test("pow(0) => 1", () => {
      const expr = new Term(3, "x^{3}y^{2}");
      expect(expr.pow(0).toString()).toBe("1");
    });
  });

  describe("toLatex()", () => {
    test("() => \\frac{1}{2}", () => {
      const expr = new Term(1, 2);
      expect(expr.toLatex()).toBe("\\frac{1}{2}");
    });
    test("({decimal}) => 0.5", () => {
      const expr = new Term(1, 2);
      expect(expr.toLatex({ decimal: true })).toBe("0.5");
    });
    test("({sign}) => +5", () => {
      const expr = new Term(5);
      expect(expr.toLatex({ sign: true })).toBe("+5");
    });
    test("({sign}) => 0", () => {
      const expr = new Term(0);
      expect(expr.toLatex({ sign: true })).toBe("0");
    });
    test("({sign}) => +x", () => {
      const expr = new Term(1, "x");
      expect(expr.toLatex({ sign: true })).toBe("+ x");
    });
    test("({sign}) => -x", () => {
      const expr = new Term(-1, "x");
      expect(expr.toLatex({ sign: true })).toBe("- x");
    });
    test("({brackets}) => (+3)", () => {
      const expr = new Term(3);
      expect(expr.toLatex({ brackets: "()" })).toBe("\\left( +3 \\right)");
    });
    test("({brackets}) => (-3)", () => {
      const expr = new Term(-3);
      expect(expr.toLatex({ brackets: "()" })).toBe("\\left( -3 \\right)");
    });
    test("({brackets}) => 0", () => {
      const expr = new Term(0);
      expect(expr.toLatex({ brackets: "()" })).toBe("0");
    });
    test("({brackets}) => (+x)", () => {
      const expr = new Term(1, "x");
      expect(expr.toLatex({ brackets: "()" })).toBe("\\left( + x \\right)");
    });
    test("({brackets}) => (-x)", () => {
      const expr = new Term(-1, "x");
      expect(expr.toLatex({ brackets: "()" })).toBe("\\left( - x \\right)");
    });
  });
});
