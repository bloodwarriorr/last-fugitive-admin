import { LevelType } from "../Types/Types";

export const signIn = async (admin:{email:string,password:string}) => {
    const requestOptions = {
      method: "post",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body:JSON.stringify(admin)
    };
    try {
      const data = await fetch(process.env.REACT_APP_SERVER + "/signUp", requestOptions);
      if (data.ok) {
        const json = await data.json();
        return json;
      }
      throw new Error("Error while logging in!");
    } catch {
      throw new Error("Network Error!");
    }
  }

  //statistics
  export const getPopularLevels = async (uid:string) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
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

  export const getTotalRegistrationByYear = async (uid:string,year:number) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
    };
    try {
      const data = await fetch(process.env.REACT_APP_SERVER + `/TotalRegistration/${year}`, requestOptions);
      
      if (data.ok) {
        const json = await data.json();
        return json;
      }
      throw new Error("Error while get total registered users");
    } catch {
      throw new Error("Network Error!");
    }
  };

  export const getLevelRankAvg= async (uid:string) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
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

  export const getPopularHours= async (uid:string) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
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

  export const getAmountOfUsers= async (uid:string) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
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
  export const getAmountOfGuests= async (uid:string) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
    };
    try {
      const data = await fetch(process.env.REACT_APP_SERVER + "/guests/amountOfGuests", requestOptions);
      if (data.ok) {
        const json = await data.json();
        return json;
      }
      throw new Error("Error while get amount of guests");
    } catch {
      throw new Error("Network Error!");
    }
  };
  export const getAllLevels= async (uid:string) => {
    const requestOptions = {
      method: "get",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
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
  export const InsertLevel= async (uid:string,level:LevelType) => {
    const requestOptions = {
      method: "post",
      headers: { "Content-type": "application/json; charset=UTF-8","uid":uid },
      body: JSON.stringify(level)
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

