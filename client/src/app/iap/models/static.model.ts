export interface IGender {
    Id: number;
    Name: string;
    Code: string;
}
export interface ITitle {
    Id: number;
    Name: string;
}
export interface ICountry {
    Id: number;
    Name: string;
    Code: string;
}
export interface IProvinceState {
    Id: number;
    Name: string;
    Code: string;
}
export interface ILanguage {
    Id: number;
    Name: string;
    Code: string;
    Desc: string;
}
export interface IPhone {
    countryCode: string;
    number: string;
}
// export interface ICountry {
//     code: string;
//     name: string;
//     provinceList?: IState[];
// }

export interface IState {
    code: string;
    name: string;
}

