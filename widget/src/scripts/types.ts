export type TotalStyle = 'pill' | 'outline' | 'none';

export type CommandPermission = 'everyone' | 'moderators';

export type Config = {
  commandNames: string[];
  enableCommand: boolean;
  commandPermission: CommandPermission;
  enableReward: boolean;
  rewards: Map<string, number>;
  enableMinusCommand: boolean;
  minusCommandNames: string[];
  enableTotalCommand: boolean;
  totalCommandNames: string[];
  enableMinusReward: boolean;
  minusRewards: Map<string, number>;
  minusStarText: string;
  minusStarColor: string;
  minusTextColor: string;
  enableBits: boolean;
  minBits: number;
  amount: number;
  maxAmount: number;
  commandCooldown: number;
  maxMinusAmount: number;
  starText: string;
  showTotal: boolean;
  totalText: string;
  totalFontSize: number;
  totalTextColor: string;
  totalStyle: TotalStyle;
  totalStyleColor: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  starColor: string;
  smallStarColor: string;
  showSmallStars: boolean;
  minusShowSmallStars: boolean;
  starWobble: boolean;
  starSize: number;
  customImageUrl: string;
  minusCustomImageUrl: string;
  soundUrl: string;
  minusSoundUrl: string;
  soundVolume: number;
  holdDuration: number;
};

export type PointEvent = {
  user: string;
  isMinus?: boolean;
  amount?: number;
  totalOnly?: boolean;
};
