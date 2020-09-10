interface ProviderConfig {
  itemId: string;
  pos: Vector;
}

interface PainterConfig {
  color: Color;
  pos: Vector;
}

interface ServerConfig {
  pos: Vector;
  capacity?: number;
}

interface LevelConfig {
  providers: Vector[];
  painters: Vector[];
  servers: Vector[];
}
