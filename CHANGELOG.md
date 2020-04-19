# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.1.1] - 2020-04-19

### Changed

- Use rollup to build lib

## [3.1.0] - 2020-04-06

### Added

- Main barrel

### Changed

- Remove `rxjs` and `localforage` from peer deps
- Make `useSubjects` use `React.useCallback` to prevent unecessary calls
- Add opt fn parameter to `useBehaviorSubject`
- Simplify `debounce` and `timeout`, and make them use `React.useCallback` [BREAKING]

### Removed

- Source maps from tarball

## [3.0.4] - 2020-03-19

### Added

- useSubject and useBehaviorSubject

## [3.0.3] - 2020-03-19

### Added

- useTimeout
- useInterval

### Updated

- Types name + comments

## 3.0.2 - 2020-03-18

### Fixed

- Missing elements in docs

## 3.0.1 - 2020-03-18

### Fixed

- Missing files in npm lib archive

## 3.0.0 - 2020-03-18

### Added

- This changelog

[unreleased]: https://github.com/soywod/react-captain/compare/v3.1.0...HEAD
[3.1.0]: https://github.com/soywod/react-captain/compare/v3.1.0...v3.0.4
[3.0.4]: https://github.com/soywod/react-captain/compare/v3.0.3...v3.0.4
[3.0.3]: https://github.com/soywod/react-captain/releases/tag/v3.0.3
