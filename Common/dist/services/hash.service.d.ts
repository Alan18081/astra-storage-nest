export declare class HashService {
    private readonly ROUNDS;
    generateHash(str: string): Promise<string>;
    compareHash(str: string, hash: string): Promise<boolean>;
}
