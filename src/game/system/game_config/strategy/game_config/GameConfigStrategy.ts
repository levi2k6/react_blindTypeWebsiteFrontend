import type { GameConfig } from "../../../../utils/types";

export interface GameConfigStrategy{
    getGameConfig(): GameConfig;
    setGameConfig(gameConfig: GameConfig): void;
}


