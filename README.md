# Timetracking :hourglass:
[![npm version](https://img.shields.io/npm/v/timetracking.svg)](https://www.npmjs.com/package/timetracking)
[![license](https://img.shields.io/github/license/mvmjacobs/timetracking.svg)](https://github.com/mvmjacobs/timetracking/blob/master/LICENSE.md)
[![npm downloads](https://img.shields.io/npm/dt/timetracking.svg)](https://www.npmjs.com/package/timetracking)

A simple command line app to track your time. It was inspired by [Timet](https://github.com/fabiorogeriosj/timet) and [Time tracker](https://github.com/danibram/time-tracker-cli).

## What's new?
[**Here**](https://github.com/mvmjacobs/timetracking/blob/master/CHANGELOG.md) you can find a complete list of improvements and fixes made in the current version.

## Installation

```
$ npm install timetracking -g
```
Now you can start to call `timetracking` or `tm` command.

The data and the default config are stored inside `~/.config/configstore/timetracking.json`.

## How to use
Run `--help` or `-h` to see all commands.
```
Usage: timetracking|tm [options] [command]

  Commands:
    start|s <task> [description]          Start task with a description.
    pause|p [task]                        Pause a task. If you do not inform the [task] all tasks in progress will be paused.
    finish|f [task]                       Finish a task. If you do not inform the [task] all tasks in progress will be completed.
    list|l [date]                         Resume time of the taks. You can pass the date on format configured.
    add|a <task> <time_spent> [date]      Add a task with a specific time spent and on a specific date.


  Options:
    -V, --version  output the version number.
    -h, --help     output usage information.
```

### Start
You can start a task running the following command:

```
$ timetracking start <task name> [task description]
or
$ tm s <task name> [task description]
```
By default, when you start a task, all other tasks in progress are paused. Add the option `-n` to not pause the others tasks:
```
$ timetracking start <task name> [task description] -n
or
$ tm s <task name> [task description] -n
```

### Pause
You can pause a task running the following command:
```
$ timetracking pause [task name]
or
$ tm p [task name]
```
If you do not inform the **[task]** all tasks in progress will be paused.

### Finish
You can finish a task running the following command:
```
$ timetracking finish [task name]
or
$ tm f [task name]
```
If you do not inform the **[task]** all tasks in progress will be completed.

### List
You can get a resume of your tasks in a date running the following command:
```
$ timetracking list [date]
or
$ tm l [date]
```
The result will be a list of your tasks and the time (`HH:mm`) each took, like this:

[![tm list](http://i.imgur.com/c5TUhUX.png)](https://github.com/mvmjacobs/timetracking#list)

> **Note 1**: By default [date] must be in the format configured `dd/MM/yyyy`. This format can be changed by the configuration file, see [Installation](https://github.com/mvmjacobs/timetracking#installation) section.
>
> **Note 2**: If the [date] is not given the summary will be the current date.

### Add
You can add a task with a specific time spent and on a specific date running the following command:
```
$ timetracking add <task> <time_spent> [date]
or
$ tm a <task> <time_spent> [date]
```

The **<time_spent>** parameter must be like this: `1h` | `15m` | `H:mm` | `HH:mm`.

By default **[date]** paremeter must be in the format `dd/MM/yyyy` and you can pass the start time as `h:mm`. If the **[date]** is not given the summary will be the current date/time. The date format can be configured by the configuration file, see [Installation](https://github.com/mvmjacobs/timetracking#installation) section.

---

## How to contribute
Found a bug? Wrote a cool code? Do you want to help with the documentation? Great! [Learn how to contribute](https://github.com/mvmjacobs/timetracking/blob/master/CONTRIBUTING.md) or [open an issue](https://github.com/mvmjacobs/timetracking/issues) and help make the app even better.

## License
This repository is licensed under the [MIT License](https://github.com/mvmjacobs/timetracking/blob/master/LICENSE.md).
