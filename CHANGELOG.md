# bedrock-web-account ChangeLog

## 6.2.1 - 2026-02-19

### Fixed
- Remove nested data object from `AccountService.createMeter` response.

## 6.2.0 - 2026-02-07

### Added
- Add `AccountService.createMeter` method to request meter creation.

## 6.1.0 - 2023-10-18

### Added
- Add optional captcha validation from Cloudflare Turnstile, if `token` is
  present in `RegisterController`.

## 6.0.0 - 2023-10-16

### Changed
- **BREAKING**: Drop support for Node.js < 18.
- Use `@digitalbazaar/http-client@4.0`. Requires Node.js 18+.

## 5.0.0 - 2023-01-24

### Changed
- **BREAKING**: The `update()` method now requires at least a
  `@bedrock/account-http@7` backend. The signature no longer takes the `id`
  parameter, only the full `account` to be updated, as it no longer uses
  a `patch` mechanism.

## 4.0.0 - 2022-08-19

### Changed
- Update to ESM dependencies.
- **BREAKING**: Use `exports` instead of `module`.

## 3.0.2 - 2022-04-10

### Fixed
- Fix `exists()` API on `AccountService`.

## 3.0.1 - 2022-04-10

### Fixed
- Only export `lib` dir.

## 3.0.0 - 2022-04-10

### Changed
- **BREAKING**: Rename package to `@bedrock/web-account`.
- **BREAKING**: Convert to module (ESM).

### Removed
- **BREAKING**: Remove obsolete `getRoles` API.

## 2.1.0 - 2022-03-07

### Changed
- Use `@digitalbazaar/http-client@2` internally. This should not constitute
  a breaking change.
- Update tests to work with `bedrock-account@6`.

## 2.0.0 - 2021-03-24

### Changed
- **BREAKING**: Replace `axios` with `@digitalbazaar/http-client`. This is
  breaking because errors thrown by the two libraries are not identical.

## 1.3.0 - 2021-03-24

### Changed
- Use `axios@0.21.1` to address security vulnerabilities.

## 1.2.1 - 2021-03-24

### Fixed
- Convert email addresses to lower case before registration.

## 1.2.0 - 2020-07-02

### Changed
- Update deps.
- Update test deps.
- Update CI workflow.

## 1.1.0 - 2020-04-21

### Added
- Setup CI and coverage workflow.

### Changed
- Update deps.

## 1.0.0 - 2019-02-20
- See git history for changes previous to this release.
