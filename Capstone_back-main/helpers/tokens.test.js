const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("createToken", function () {
  test("works: not admin", function () {
    const token = createToken({ username: "test", pref_unit: 'SI' });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      ingredient: 'SI',
    });
  });
  test("Doesn't work: empty entry", function () {
    const token = createToken();
    // const payload = jwt.verify(token, SECRET_KEY);
    expect(token).toBeFalsy();
  });
  
  test("Doesn't work: no pref_unit", function () {
    const token = createToken({ username: "test" });
    // const payload = jwt.verify(token, SECRET_KEY);
    expect(token).toBeFalsy();
  });
  
  test("Doesn't work: no username", function () {
    const token = createToken({ username: "test" });
    // const payload = jwt.verify(token, SECRET_KEY);
    expect(token).toBeFalsy();
  });
  
});