# Timetracking :hourglass:
[![npm version](https://img.shields.io/npm/v/timetracking.svg)](https://www.npmjs.com/package/timetracking)
[![license](https://img.shields.io/github/license/mvmjacobs/timetracking.svg)](https://github.com/mvmjacobs/timetracking/blob/master/LICENSE.md)
[![npm downloads](https://img.shields.io/npm/dt/timetracking.svg)](https://www.npmjs.com/package/timetracking)

A simple command line app to track your time. It was inspired by [Timet](https://github.com/fabiorogeriosj/timet) and [Time tracker](https://github.com/danibram/time-tracker-cli).

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
    start|s <task> [description]   Start task with a description.
    pause|p <task>                 Pause a task.
    finish|f <task>                Finish a task.
    list|l [date]                  Resume time of the taks. You can pass the date on format configured (dd/MM/yyyy).


  Options:
    -V, --version  output the version number.
    -h, --help     output usage information.
```

#### Start
You can start a task running the following command:

```
$ tm start <task name> [task description]
```
By default, when you start a task, all other tasks in progress are paused. Add the option `-n` to not pause:
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

#### List
You can get a resume of your tasks in a date running the following command:
```
$ tm list [date]
```
The result will be a list of your tasks and the time (`HH:mm`) each took, like this:

[![tm list](http://i.imgur.com/wMWS0Hx.png)](https://github.com/mvmjacobs/timetracking#list)

> **Note 1**: By default [date] must be in the format `dd/MM/yyyy`.
>
> **Note 2**: If a [date] is not given the summary will be the current date.

## License
This repository is licensed under the [MIT License](https://github.com/mvmjacobs/timetracking/blob/master/LICENSE.md).
