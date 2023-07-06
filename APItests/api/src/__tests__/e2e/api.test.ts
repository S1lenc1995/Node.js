import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { clearDB } from "./helpers";
import createApp from "../../initApp";
import request from "supertest";


describe("API tests", () => {
  let app;
  let server;
  const user = {
    email: "test@gmail.com",
    password: "testpassword",
    confirmPassword: "testpassword",
  };

  beforeAll(async () => {
    await clearDB(global.DB_CONNECTION);
    const App = await createApp();
    console.log(App,'1111111111111')
    app = App.app;
    server = App.server;


  });

  afterAll(async () => {
    await server.close();
  });

  describe("auth controller", () => {
    test("Get token on register", async () => {
      const res = await request(app).post(`/auth/register`).send(user);
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(user.email);
      expect(res.body.token).toBeTruthy();
    });
  });

  /*   test("Get token on login", async () => {
      const res = await request(app).post(`/auth/pass/login`).send(user);
      expect(res.statusCode).toBe(200);
      expect(res.body.user.email).toBe(user.email);
      expect(res.body.user.token).toBeTruthy();
    });

    test("Get current user by token", async () => {
      const res = await request(app).post(`/auth/pass/login`).send(user);
      expect(res.statusCode).toBe(200);
      expect(res.body.user.token).toBeTruthy();
      const token = res.body.user.token;

      const res2 = await request(app)
        .get(`/auth/pass/current`)
        .set("Authorization", `Token ${token}`);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.user.email).toBe(user.email);
    });
  });
  describe("posts controller", () => {
    let token;
    beforeAll(async () => {
      const res = await request(app).post(`/auth/pass/login`).send(user);
      token = res.body.user.token;
    });

    const postPayload = {
      title: "Some title",
      content: "Some contents",
      tags: ["business", "hot"],
    };

    test("Get all posts", async () => {
      const res = await request(app).get(`/posts/`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(0);
    });

    test("Create posts", async () => {
      const res2 = await request(app)
        .post(`/posts/`)
        .set("Authorization", `Token ${token}`)
        .send(postPayload);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.title).toEqual(postPayload.title);
      expect(res2.body.content).toEqual(postPayload.content);
      expect(res2.body.tags).toEqual(postPayload.tags);
      expect(res2.body.author.email).toEqual(user.email);
    });

    test("Get all posts after create", async () => {
      const res = await request(app).get(`/posts/`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toEqual(postPayload.title);
      expect(res.body[0].content).toEqual(postPayload.content);
      expect(res.body[0].tags).toEqual(postPayload.tags);
      expect(res.body[0].author.email).toEqual(user.email);
    }); */
  });

