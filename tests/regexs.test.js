import {
  allVersionRegexs,
  attributeVersionRegex,
  regularVersionRegex,
  semVerRegex,
} from "../lib/helpers/regexs";
import { invalidSemVers, validSemVers } from "./fixtures/regexs.fixture";

describe("semVerRegex", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length);

    for (let semVer of validSemVers) {
      expect(semVer).toMatch(new RegExp("^" + semVerRegex.source + "$"));
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(invalidSemVers.length);

    for (let semVer of invalidSemVers) {
      expect(semVer).not.toMatch(new RegExp("^" + semVerRegex.source + "$"));
    }
  });
});

describe("regularVersionRegex / allVersionRegexs", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 6);

    for (let semVer of validSemVers) {
      expect(`version:"${semVer}"`).toMatch(regularVersionRegex);
      expect(`version:"${semVer}"`).toMatch(allVersionRegexs);
      expect(` version: "${semVer}" ,`).toMatch(regularVersionRegex);
      expect(` version: "${semVer}" ,`).toMatch(allVersionRegexs);
      expect(`  version:  "${semVer}"  ,`).toMatch(regularVersionRegex);
      expect(`  version:  "${semVer}"  ,`).toMatch(allVersionRegexs);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 10 + invalidSemVers.length * 2);

    for (let semVer of validSemVers) {
      expect(`version: ${semVer}`).not.toMatch(regularVersionRegex);
      expect(`version: ${semVer}`).not.toMatch(allVersionRegexs);
      expect(`version "${semVer}"`).not.toMatch(regularVersionRegex);
      expect(`version "${semVer}"`).not.toMatch(allVersionRegexs);
      expect(`versin: "${semVer}",`).not.toMatch(regularVersionRegex);
      expect(`versin: "${semVer}",`).not.toMatch(allVersionRegexs);
      expect(`"~> ${semVer}"`).not.toMatch(regularVersionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(allVersionRegexs);
      expect(`tag: "${semVer}",`).not.toMatch(regularVersionRegex);
      expect(`tag: "${semVer}",`).not.toMatch(allVersionRegexs);
    }

    for (let semVer of invalidSemVers) {
      expect(`version: "${semVer}"`).not.toMatch(regularVersionRegex);
      expect(`version: "${semVer}"`).not.toMatch(allVersionRegexs);
    }
  });
});

describe("attributeVersionRegex / allVersionRegexs", () => {
  it("should match valid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 6);

    for (let semVer of validSemVers) {
      expect(`@version "${semVer}"`).toMatch(attributeVersionRegex);
      expect(`@version "${semVer}"`).toMatch(allVersionRegexs);
      expect(` @version "${semVer}"`).toMatch(attributeVersionRegex);
      expect(` @version "${semVer}"`).toMatch(allVersionRegexs);
      expect(`  @version  "${semVer}"`).toMatch(attributeVersionRegex);
      expect(`  @version  "${semVer}"`).toMatch(allVersionRegexs);
    }
  });

  it("should not match invalid values", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    expect.assertions(validSemVers.length * 10 + invalidSemVers.length * 2);

    for (let semVer of validSemVers) {
      expect(`@version ${semVer}`).not.toMatch(attributeVersionRegex);
      expect(`@version ${semVer}`).not.toMatch(allVersionRegexs);
      expect(`@version"${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`@version"${semVer}"`).not.toMatch(allVersionRegexs);
      expect(`@versin "${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`@versin "${semVer}"`).not.toMatch(allVersionRegexs);
      expect(`"~> ${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`"~> ${semVer}"`).not.toMatch(allVersionRegexs);
      expect(`@tag "${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`@tag "${semVer}"`).not.toMatch(allVersionRegexs);
    }

    for (let semVer of invalidSemVers) {
      expect(`@version "${semVer}"`).not.toMatch(attributeVersionRegex);
      expect(`@version "${semVer}"`).not.toMatch(allVersionRegexs);
    }
  });
});
