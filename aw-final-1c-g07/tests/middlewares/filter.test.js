const { Request, Response } = require("jest-express");
const filter = require("../../src/middlewares/filter");


let request;
let response;
let next;

describe("Filter middleware", () => {

  beforeEach(() => {
    request = new Request();
    response = new Response();
    next = jest.fn();
  });

  afterEach(() => {
    request.resetMocked();
    response.resetMocked();
    next.mockClear();
  });

  test("should block scss files", () => {
    request.setOriginalUrl("/assets/scss/index.scss");
    filter(request, response, next);
    expect(next).not.toHaveBeenCalled();
  });

  test("should block files inside the scss directory", () => {
    request.setOriginalUrl("/assets/scss/something.txt");
    filter(request, response, next);
    expect(next).not.toHaveBeenCalled();
  });

  test("should block map files", () => {
    request.setOriginalUrl("/assets/scss/index.scss.map");
    filter(request, response, next);
    expect(next).not.toHaveBeenCalled();
  });

  test("should block gitkeep files", () => {
    request.setOriginalUrl("/.gitkeep");
    filter(request, response, next);
    expect(next).not.toHaveBeenCalled();
  });

  test("should not block html files", () => {
    request.setOriginalUrl("/index.html");
    filter(request, response, next);
    expect(next).toHaveBeenCalled();
  });

  test("should not block css files", () => {
    request.setOriginalUrl("/assets/css/index.css");
    filter(request, response, next);
    expect(next).toHaveBeenCalled();
  });
});
