import { LevelType, LifeType } from "../Types/Types";

export const signIn = async (admin: { email: string; password: string }) => {
  const requestOptions = {
    method: "post",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(admin),
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/signUp", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return data.status;
  } catch (err) {
    throw new Error("Network Error");
  }
};

//statistics
export const getPopularLevels = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/popularLevels", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get popular levels");
  } catch {
    throw new Error("Network Error!");
  }
};
export const getTotalRegistrationByYear = async (uid: string, year: number) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + `/TotalRegistration/${year}`,
      requestOptions
    );

    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get total registered users");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getLevelRankAvg = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/LevelRankAvg", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get level rank avg");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getPopularHours = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/popHours", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get popular hours stats");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getAmountOfUsers = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/users/amountOfUsers", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get amount of users");
  } catch {
    throw new Error("Network Error!");
  }
};
export const getAmountOfGuests = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/guests/amountOfGuests",
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get amount of guests");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getAllUsers = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/users/",
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get amount of users");
  } catch {
    throw new Error("Network Error!");
  }
};



export const deActiveUser = async (uid: string,_id:string) => {
  const requestOptions = {
    method: "put",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/users/delete/"+_id,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while ban user");
  } catch {
    throw new Error("Network Error!");
  }
};

export const reActiveUser = async (uid: string,_id:string) => {
  const requestOptions = {
    method: "put",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/users/reactive/"+_id,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while ban user");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getLifes = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/lifes/",
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get lifes");
  } catch {
    throw new Error("Network Error!");
  }
};

export const updateLifeDoc = async (uid: string,lifeObj:LifeType) => {
  const requestOptions = {
    method: "put",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
    body:JSON.stringify(lifeObj)
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/updateLife/",
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while update life doc");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getGameTotalPopularAvg = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/TotalPopularAvg/",
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get total game popularity");
  } catch {
    throw new Error("Network Error!");
  }
};


export const getGameTotalPlayTime = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER + "/TotalPlayTime/",
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get total game play time");
  } catch {
    throw new Error("Network Error!");
  }
};

export const getAllLevels = async (uid: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/levels", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get levels");
  } catch {
    throw new Error("Network Error!");
  }
};
export const InsertLevel = async (uid: string, level: LevelType) => {
  const requestOptions = {
    method: "post",
    headers: { "Content-type": "application/json; charset=UTF-8", uid: uid },
    body: JSON.stringify(level),
  };
  try {
    const data = await fetch(process.env.REACT_APP_SERVER + "/levels/add", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    throw new Error("Error while get levels");
  } catch {
    throw new Error("Network Error!");
  }
};
