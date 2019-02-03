<a name="1.3.0"></a>
## [v1.3.0](https://github.com/mvmjacobs/timetracking/releases/tag/v1.3.0) | 2019-02-03

### Improvements
* **test**: Add initial unit test coverage. ([#22](https://github.com/mvmjacobs/timetracking/issues/22)) ([58255fb1](https://github.com/mvmjacobs/timetracking/commit/58255fb1))

<a name="1.2.2"></a>
## [v1.2.2](https://github.com/mvmjacobs/timetracking/releases/tag/v1.2.2) | 2017-12-11

### Bug Fixes
* **pause**: Fixed the command that was finishing the task instead of pausing. ([#23](https://github.com/mvmjacobs/timetracking/issues/23)) ([074242e](https://github.com/mvmjacobs/timetracking/commit/074242e))

<a name="1.2.1"></a>
## [v1.2.1](https://github.com/mvmjacobs/timetracking/releases/tag/v1.2.1) | 2017-10-24

### Bug Fixes
* **finish|pause**: Fixed commands when the `-t` option is not enter. ([#21](https://github.com/mvmjacobs/timetracking/issues/21)) ([beefa0d](https://github.com/mvmjacobs/timetracking/commit/beefa0d))

<a name="1.2.0"></a>
## [v1.2.0](https://github.com/mvmjacobs/timetracking/releases/tag/v1.2.0) | 2017-10-23

### Improvements
* **config**: Default date format in config file was changed to `MM/dd/yyyy`. ([#19](https://github.com/mvmjacobs/timetracking/issues/19)) ([96d9474](https://github.com/mvmjacobs/timetracking/commit/96d9474))
* **start**: Now the task description is informed from an option. [See here](https://github.com/mvmjacobs/timetracking#start) to know how to use it. ([#16](https://github.com/mvmjacobs/timetracking/issues/16)) ([f7cbc67](https://github.com/mvmjacobs/timetracking/commit/f7cbc67))
* **finish|pause**: Now you can stop a task with date and time. [See here](https://github.com/mvmjacobs/timetracking#pause) to know how. ([#18](https://github.com/mvmjacobs/timetracking/issues/18)) ([81f4c69](https://github.com/mvmjacobs/timetracking/commit/81f4c69), [40ced82](https://github.com/mvmjacobs/timetracking/commit/40ced82))

### Bug Fixes
* **finish|pause**: Fix console message when the task has already been stopped. ([#20](https://github.com/mvmjacobs/timetracking/issues/20)) ([d2fb57c](https://github.com/mvmjacobs/timetracking/commit/d2fb57c))

<a name="1.1.1"></a>
## [v1.1.1](https://github.com/mvmjacobs/timetracking/releases/tag/v1.1.1) | 2017-09-04

### Improvements
* **list**: Now displays the task status. ([#14](https://github.com/mvmjacobs/timetracking/issues/14)) ([61d25ce](https://github.com/mvmjacobs/timetracking/commit/61d25ce))

### Bug Fixes
* **add**: 	Fix expression to validate `[time_spent]` parameter. ([#13](https://github.com/mvmjacobs/timetracking/issues/13)) ([9a495f1](https://github.com/mvmjacobs/timetracking/commit/9a495f1))

<a name="1.1.0"></a>
## [v1.1.0](https://github.com/mvmjacobs/timetracking/releases/tag/v1.1.0) | 2017-09-04

### Features
* **add**: New command! Now you can add tasks running the command `add`. [Here](https://github.com/mvmjacobs/timetracking/tree/master#add) you can see how to use. ([#8](https://github.com/mvmjacobs/timetracking/issues/8)) ([a1f5a6](https://github.com/mvmjacobs/timetracking/commit/a1f5a6))
* **pause**: Now `task` parameter is optional, you can pause all tasks in progress. ([#4](https://github.com/mvmjacobs/timetracking/issues/4)) ([4ab557f](https://github.com/mvmjacobs/timetracking/commit/4ab557f))
* **finish**: Now `task` parameter is optional, you can complete all tasks in progress. ([#4](https://github.com/mvmjacobs/timetracking/issues/4)) ([4ab557f](https://github.com/mvmjacobs/timetracking/commit/4ab557f))

<a name="1.0.1"></a>
## [v1.0.1](https://github.com/mvmjacobs/timetracking/releases/tag/v1.0.1) | 2017-09-02

### Bug Fixes
* Now when you type `tm` command will show help section.
* Tasks list now displays the hours in `HH:mm` format instead `H:mm`.
* Date format used is the same as the one saved in the settings file.

<a name="1.0.0"></a>
# [v1.0.0](https://github.com/mvmjacobs/timetracking/releases/tag/v1.0.0) | 2017-08-27

* Initial release.
* Basic options: start, pause, finish, list.
