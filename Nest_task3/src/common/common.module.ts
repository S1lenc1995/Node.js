import { Global, Module } from "@nestjs/common";
import { HashService } from "./hashService/hash.service";

@Global()
@Module({
    providers: [HashService],
    exports: [HashService],
})

export class CommonModule {}