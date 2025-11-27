import type { GameConfig } from "../../../../../utils/types/GameConfigType";

export interface GameConfigStrategy{
    getGameConfig(): GameConfig;
    setGameConfig(gameConfig: GameConfig): void;
}


