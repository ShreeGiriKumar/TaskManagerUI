export class TaskDO {
    TaskId: number;
    TaskInfo: string;
    ParentTask:string;
    Priority: number;
    StartDate:Date;
    EndDate: Date;
    IsTaskEnded: boolean;
}
