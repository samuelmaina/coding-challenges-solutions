import Timer from "./Timer";

const NS_PER_SEC = 1e9;

describe("Timer", () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });
  test("should not start if the timer is started", () => {
    timer.start();
    expect(() => {
      timer.start();
    }).toThrowError(
      "Stop watch is running. Please stop the running instance before restarting"
    );
  });

  test("should not stop if the timer is not started", () => {
    expect(() => {
      timer.stop();
    }).toThrowError("Please start the stop watch before stopping.");
  });

  test("runtimeMs() should return the correct time in milliseconds", () => {
    timer.start();
    const waitTimeMs = 100;
    const waitNs = waitTimeMs * NS_PER_SEC;
    const waitPromise = new Promise((resolve) =>
      setTimeout(resolve, waitTimeMs)
    );
    return waitPromise.then(() => {
      timer.stop();
      expect(timer.runtimeMs()).toBeGreaterThanOrEqual(waitTimeMs);
      expect(timer.runtimeMs()).toBeLessThan(waitTimeMs + 2); // Allow a small margin of error
    });
  });

  test("runtimeNs() should return the correct time in nanoseconds", () => {
    timer.start();
    const waitTimeNs = 1000000; // 1ms in nanoseconds
    const waitPromise = new Promise((resolve) => setTimeout(resolve, 1));
    return waitPromise.then(() => {
      timer.stop();
      expect(timer.runtimeNs()).toBeGreaterThanOrEqual(waitTimeNs);
      expect(timer.runtimeNs()).toBeLessThan(waitTimeNs + 500000); // Allow a small margin of error of 0.5 milliseconds
    });
  });

  test("reset() should reset the timer", () => {
    timer.start();
    new Promise((resolve) => setTimeout(resolve, 1)).then(() => {
      timer.stop();
      expect(timer.runtimeNs()).toBeGreaterThanOrEqual(1 * 1e9);
      expect(timer.runtimeNs()).toBeLessThan(1 * 1e9 + 10000); // Allow a small margin of error
    });
    timer.stop();

    timer.reset();

    expect(timer.runtimeMs()).toBe(0);
    expect(timer.runtimeNs()).toBe(0);
  });
});
