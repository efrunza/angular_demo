import * as moment from 'moment';

// This is the data formatter class.

// It contains methods that does the following:

//  -   map the database's data types into the typescript data types
//  -   format data into a particular format as it is the case of the date

export class DataFormatter {

    public static BitToBoolean(value:string): boolean {

        if (value === "1") return true;

        return false;
    }

    public static BooleanToBit(value: boolean): number {

        if (value === true) return 1;

        return 0;
    }

    public static DateToString(value: Date): string {

        return moment(value).format("MM/DD/YYYY");  
    }

    public static StringToDate(value: string): Date {

        return new Date(value);
    }
}