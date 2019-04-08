import {Module} from "@nestjs/common";
import {ConfigService} from "@astra/common/services";
import {JwtModule} from "@nestjs/jwt";
import {CoreModule} from "../core/core.module";

@Module({
    imports: [
        CoreModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                console.log(configService);
                return {
                    secretOrPrivateKey: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: +configService.get('JWT_EXPIRES'),
                    },
                }
            },
            inject: [ConfigService]
        }),
    ],
    exports: [JwtModule]
})
export class CustomJwtModule {}