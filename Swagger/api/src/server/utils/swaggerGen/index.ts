import swaggerAutogen from "swagger-autogen";
import PostsController from "server/posts/posts.controller";

const doc = {
    info: {
        title: "My API",
        description: "Description"
    },
    host: "localhost:8080",
    schemes: ["http"],
}

const outputFile = "./src/server/utils/swaggerGen/output/swagger.json"

function SwaggerGenerate(rootRouter){
    console.log(rootRouter)
    return swaggerAutogen(outputFile, ["./src/server/posts/posts.controller.ts", "./src/server/auth/auth.controller.ts"], doc)
}

export default SwaggerGenerate;