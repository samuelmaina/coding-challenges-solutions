const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6;

type HrType = [number, number];

class Timer {
  private time: HrType;
  private diff: HrType;
  private isRunning: boolean;
  constructor() {
    this.time = process.hrtime();
    this.diff = process.hrtime();
    this.isRunning = false;
  }

  start(): void {
    if (this.isRunning) {
      throw new Error(
        "Stop watch is running. Please stop the running instance before restarting"
      );
    }
    this.time = process.hrtime();
    this.isRunning = true;
  }
  stop(): void {
    if (!this.isRunning) {
      throw new Error("Please start the stop watch before stopping.");
    }
    this.diff = process.hrtime(this.time);
    this.isRunning = false;
  }
  runtimeMs(): number {
    return (this.diff[0] * NS_PER_SEC + this.diff[1]) * MS_PER_NS;
  }
  runtimeNs(): number {
    return this.diff[0] * NS_PER_SEC + this.diff[1];
  }
  reset(): void {
    this.time = [0, 0];
    this.diff = [0, 0];
    this.isRunning = false;
  }
}
export default Timer;
