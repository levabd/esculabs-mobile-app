# esculabs-mobile-app
## Структура проекта
- [grunt](grunt) - папка с параметрами сборки grunt
- [hooks](hooks) - папка для кастомизации команд cordova
- [platforms](platforms) - папка с платформами сборки (Android, iOS)
- [plugins](plugins) - папка с нативными плагинами для cordova
- [project](project) - папка с проектом

## Начальное окружение
Установите и настройте:

1. [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (Windows - [Git Bash](http://git-scm.com/download/win)).

2. [Npm](https://nodejs.org/download/) (Windows требует [python 2.7.x](https://www.python.org/downloads/), версия важна).

3. [Bower](https://www.npmjs.com/package/bower) (глобально, как пакет npm).

4. [Grunt-cli](https://www.npmjs.com/package/grunt-cli) (глобально, как пакет npm).

5. [Cordova](https://www.npmjs.com/package/cordova) (глобально, как пакет npm).

7. SDK платформ с которыми вы будете работать (Android SDK, JDK, X-Code).


## Первый запуск
После настройки окружения, запустите следующую команду в директории проекта.
```cli
$ bower i
```
Bower установит все зависимости в папку bower_components.
**P.S** Если вы добавили новую зависимость, необходимоые файлы библиотек необходимо поместить в [project/vendor](project/vendor), структура и способ размещения описан в [project/vendor](project/vendor)

```cli
$ npm i
```
Npm установит все nodeJS модули в папку node_modules.

```cli
$ grunt
```
Планировщик задач grunt скомпилирует исходные файлы из папки [project](project) в [www](www).

```cli
$ grunt plugins
```
Планировщик задач grunt запустит следующий алгоритм:
- Удаление всех плагинов.
- Установка списка плагинов из файла [plugins.json](plugins.json).

P.S: Для старой версии Cordova, а также при возникновении ошибки работы скрипта:
- Удалить существующие платформы
- Запускать скрипт если потребуется несколько раз, до успешного завершения установки всех плагинов.

## Работа
Перед тем как начать что-то менять запустите 'watcher', программу, которая следит за файлами и автоматически компилирует ту часть, что вы изменили.
Запустить watcher, можно командой
```cli
$ grunt watch
```

##Тестирование и Загрузка на телефон

Для запуска на реальном устройстве или эмуляторе устройства:
```cli
$ cordova platform add 'platform'   //example  cordova platform add android
$ cordova run 'platform'   //example  cordova run android
```

При наличии подключения реального устройства в системе, cordova запустит приложение на нем.

## Технологии использованные в проекте
Прежде чем приступить к работе над проектом, следует, ознакомиться с технологиями, которые используются в проекте:
[AngularJS ~1.3.0](https://code.angularjs.org/1.3.14/docs/api),
[OnsenUI 1.2.2](http://onsen.io/),
[Npm (NodeJS) 0.12.0](https://nodejs.org/),
[Grunt](http://gruntjs.com/),
[Bower](http://bower.io/),
[SASS](http://sass-lang.com/),

Для продвинутой работы также не помешает понимание:
[Underscore](http://underscorejs.org/)