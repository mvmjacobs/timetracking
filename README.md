Timetracking
====================
A simple command line app to track your time.

**It's still under development.**

## Installation

```
$ npm install timetracking -g
```
Now you can start to call `timetracking` or `tm` command.

## Usage
Run `--help` or `-h` to see all commands.
```
Usage: timetracking|tm [options] [command]

  Commands:
    start|s <task> [description]      Start task with a description.
    pause|p <task>                    Pause a task.
    finish|f <task>                   Finish a task.


  Options:
    -V, --version  output the version number.
    -h, --help     output usage information.
```

#### Start
You can start a task running the following command:
```
$ tm start <task name> [task description]
```
By default, when you start a task, all other tasks in progress are paused. Add the option `-n` to the start command to not pause:
```
$ tm start <task name> [task description] -n
```

#### Pause
You can pause a task running the following command:
```
$ tm pause <task name>
```

#### Finish
You can finish a task running the following command:
```
$ tm finish <task name>
```

## License
This repository is licensed under the [MIT License](https://github.com/mvmjacobs/timetracking/blob/master/LICENSE.md).
