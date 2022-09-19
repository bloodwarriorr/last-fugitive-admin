import React from "react";

export interface AlertType {
  isOpen: boolean;
  type: "error" | "success";
  message: string;
}
export interface LifeObjType {
  amount: number | null
  dueTo: Date | null | undefined;
}
export interface LifeType {
  user: LifeObjType;
  guest: LifeObjType;
}
export interface LifeFullType {
  addedLifeForGuest: LifeObjType;
  addedLifeForRegister: LifeObjType;
  guestUserLife: number;
  registeredUserLife: number;
}
export interface AdminDetailsType {
  email: string;
  password: string;
}
export interface useAuthType {
  authed: any;
  login: (details: AdminDetailsType) => any;
  logout: () => void;
}
export interface AdminContextType {
  token: string | null;
  login: (details: AdminDetailsType) => void;
  logout: () => void;
  children?: React.ReactNode;
}
export interface PlayerType {
  start_position: number[];
  startDirection: string;
}
export interface EnimiesType {
  code: number;
  start_position: number[];
  startDirection: string;
}
export interface StepCapType {
  code: number;
  step: number;
}
export interface LevelType {
  _id?: string;
  code: number;
  map: number[][];
  player: PlayerType;
  enemies: EnimiesType[];
  step_cap: StepCapType[];
  difficulty: number;
  end_point: number[];
}

export const emptyLevel = {
  code: 0,
  map: [...Array(4).fill([...Array(8).fill(0)])],
  player: {
    start_position: [0, 0],
    startDirection: "RIGHT",
  },
  enemies: [
    {
      code: 0,
      start_position: [0, 7],
      startDirection: "LEFT",
    },
  ],
  step_cap: [
    {
      code: 3,
      step: 10,
    },
    {
      code: 3,
      step: 15,
    },
  ],
  difficulty: 1,
  end_point: [2, 7],
};

export interface LevelRankType {
  level_code: number;
  rank: number;
  popularity?: number;
}
export interface PlayDatesType {
  start_date: Date | null;
  end_date: Date | null;
}
export interface UserType {
  _id: string;
  nickname: string;
  email: string;
  password: string;
  current_level: number;
  level_rank: LevelRankType[];
  avatarCode: number;
  avatarUrl: string;
  gender: number;
  is_notification: boolean;
  time_of_register: Date;
  play_dates: PlayDatesType[];
  token: string;
  isActive: boolean;
}
