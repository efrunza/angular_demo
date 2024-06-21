import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map'

export class Cacheable<T> {

    protected data: T;
    protected subjectData: Subject<T>;
    protected observableData: Observable<T>;
    public getHandler: () => Observable<T>;

    constructor() {
        this.subjectData = new ReplaySubject(1);
        this.observableData = this.subjectData.asObservable();
    }

    public getData(): Observable<T> {
        if (!this.getHandler) {
            throw new Error("getHandler is not defined");
        }

        if (!this.data) {
            this.getHandler().map((r: T) => {
                this.data = r;
                console.log("http call executed is:" + JSON.stringify(this.data));
                return r;
            }).subscribe(
                result => {
                    this.subjectData.next(result);
                    //console.log("get next result is:" + JSON.stringify(result));
                },
                err => this.subjectData.error(err)
            );
        }

        //console.log("get observableData:");

        return this.observableData;
    }

    public resetCache(): void {
        this.data = null;
    }

    public refresh(): Observable<T> {
        this.resetCache();
        return this.getData();
    }

}