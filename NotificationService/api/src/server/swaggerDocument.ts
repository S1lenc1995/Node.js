const swaggerConfig ={
    openapi: "3.0.3",
  
    info: {
      title: "Classwork 17",
      description: "Learn how to use swagger",
      version: "1.0.0",
      contact: {
        name: "Kletskyi Bohdan",
        email: "aaa@gmail.com",
        url: "web.com",
      },
    },
  
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server root",
      },
      {
        url: "http://localhost:8080/posts",
        description: "Local server posts",
      },
    ],
  
    tags: [
      {
        name: "Post CRUD operations", // name of a tag
      },
    ],
  
    components: {
      schemas: {
        // id model
        id: {
          type: "number",
          description: "An id of a post",
          example: "4",
        },
        // todo model
        Post: {
          type: "object", // data type
          properties: {
            id: {
              type: "number",
              description: "Post identification number",
              example: "5",
            },
            title: {
              type: "string",
              description: "Post's title",
              example: "Breaking news!",
            },
            content: {
              type: "string",
              description: "Post's content",
              example: "We have new update! It's very important",
            },
            tags: {
              type: "string[]",
              description: "Post's tags",
              example: "[fun, business]",
            },
          },
        },
        // error model
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Not found",
            },
            internal_code: {
              type: "string",
              description: "Error internal code",
              example: "Invalid parameters",
            },
          },
        },
      },
    },
  
    paths: {
      "/posts": {
        get: {
          tags: ["Post CRUD operations"], // operation's tag.
          description: "Get posts", // operation's desc.
          operationId: "getPosts", // unique operation id.
          parameters: [], // expected params.
          // expected responses
          responses: {
            // response code
            200: {
              description: "Todos were obtained", // response desc.
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: {
                        $ref: "#/components/schemas/Post",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/posts/:id": {
        get: {
          tags: ["Post CRUD operations"], // operation's tag.
          description: "Get a post", // operation's desc.
          operationId: "getPost", // unique operation id
          parameters: [
            // expected params.
            {
              name: "id", // name of the param
              in: "path", // location of the param
              schema: {
                $ref: "#/components/schemas/id", // data model of the param
              },
              required: true, // Mandatory param
              description: "A single post id", // param desc.
            },
          ],
          // expected responses
          responses: {
            // response code
            200: {
              description: "Post is obtained", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Post", // todo data model
                  },
                },
              },
            },
            // response code
            404: {
              description: "Post is not found", // response desc.
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error", // error data model
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  
export default swaggerConfig;
  