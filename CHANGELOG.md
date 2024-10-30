## [0.3.1](https://github.com/oclif/table/compare/0.3.0...0.3.1) (2024-10-30)


### Bug Fixes

* margins on plain text table ([b541bd1](https://github.com/oclif/table/commit/b541bd19637b3fc0cd8d595426333f5329029f69))



# [0.3.0](https://github.com/oclif/table/compare/0.2.4...0.3.0) (2024-10-29)


### Features

* dont use ink when size in greater than 10k ([#32](https://github.com/oclif/table/issues/32)) ([8c1371e](https://github.com/oclif/table/commit/8c1371ef3a9efbcd99f8e904c94226e913bfcd0f))



## [0.2.4](https://github.com/oclif/table/compare/0.2.3...0.2.4) (2024-10-26)


### Bug Fixes

* **deps:** bump @types/react from 18.3.11 to 18.3.12 ([a0f44d2](https://github.com/oclif/table/commit/a0f44d28bd9abf74fa054d9dffb92c648c2bf69c))



## [0.2.3](https://github.com/oclif/table/compare/0.2.2...0.2.3) (2024-10-26)


### Bug Fixes

* **deps:** bump @oclif/core from 4.0.29 to 4.0.30 ([114e4cc](https://github.com/oclif/table/commit/114e4ccc8eacdec220333be8ecdb2f465c033349))



## [0.2.2](https://github.com/oclif/table/compare/0.2.1...0.2.2) (2024-10-25)


### Bug Fixes

* handle negative margins ([#31](https://github.com/oclif/table/issues/31)) ([5c6395f](https://github.com/oclif/table/commit/5c6395fedaca7899cf18288a0d2f627446b668c2))



## [0.2.1](https://github.com/oclif/table/compare/0.2.0...0.2.1) (2024-10-23)


### Bug Fixes

* handle no data ([90257fe](https://github.com/oclif/table/commit/90257fe9031b083a76e69559521afb09b5fcfb45))



# [0.2.0](https://github.com/oclif/table/compare/0.1.24...0.2.0) (2024-10-22)


### Features

* add makeTable ([69af4d2](https://github.com/oclif/table/commit/69af4d290e7000ce72b47b6cb08e4bb3d004990f))



## [0.1.24](https://github.com/oclif/table/compare/0.1.23...0.1.24) (2024-10-21)


### Bug Fixes

* improve stdout wrapper ([3e87eca](https://github.com/oclif/table/commit/3e87ecab19a06bb74be288accac376e1fecb07b0))



## [0.1.23](https://github.com/oclif/table/compare/0.1.22...0.1.23) (2024-10-21)


### Bug Fixes

* change default fd ([c9a5f70](https://github.com/oclif/table/commit/c9a5f70e0038a001363c6887743a37ac51c947b7))



## [0.1.22](https://github.com/oclif/table/compare/0.1.21...0.1.22) (2024-10-21)


### Bug Fixes

* override stdout rows to prevent terminal clearing ([7ad0fec](https://github.com/oclif/table/commit/7ad0fec6c421787db04087f33112330ec5ef7b1d))
* windows + wireit test fix ([e69204b](https://github.com/oclif/table/commit/e69204b72a322fd212566d3f04f5ac6c6f4511c2))



## [0.1.21](https://github.com/oclif/table/compare/0.1.20...0.1.21) (2024-10-19)


### Bug Fixes

* **deps:** bump @oclif/core from 4.0.28 to 4.0.29 ([b040457](https://github.com/oclif/table/commit/b040457a5a25202d12acf3bb9bc95368bc645fc4))



## [0.1.20](https://github.com/oclif/table/compare/0.1.19...0.1.20) (2024-10-17)


### Bug Fixes

* default Stream fd to 0 ([93124c2](https://github.com/oclif/table/commit/93124c2300a54036f12391c2052ea3b34fc3cb83))



## [0.1.19](https://github.com/oclif/table/compare/0.1.18...0.1.19) (2024-10-17)


### Bug Fixes

* drop limit on printTables to 30k ([fb81cf6](https://github.com/oclif/table/commit/fb81cf63f3d57ea0fc9511fb32912931bdcff8e7))
* handle very tall tables ([b81be9e](https://github.com/oclif/table/commit/b81be9e1732621f4f56d75c3808d7b598b7c2cd3))
* handle very wide tables ([0627af9](https://github.com/oclif/table/commit/0627af931092269f58bdd67e9ecf5ba9c4a414b2))
* limit printTables to 50k total records ([b698088](https://github.com/oclif/table/commit/b6980884c1110495847481f1f637528b163961ac))
* return after rendering chunked table ([e8bfaad](https://github.com/oclif/table/commit/e8bfaad18a0df73e7b44cdb2edc4f8c27d9f2ea9))
* throw error if duplicate columns ([3a43b86](https://github.com/oclif/table/commit/3a43b86818ad6b7805adca4e64b25a64e1904856))



## [0.1.18](https://github.com/oclif/table/compare/0.1.17...0.1.18) (2024-10-12)


### Bug Fixes

* **deps:** bump @oclif/core from 4.0.17 to 4.0.28 ([33b0887](https://github.com/oclif/table/commit/33b08877c02dad162b3008aa6c799bd5cbf5e9ca))



## [0.1.17](https://github.com/oclif/table/compare/0.1.16...0.1.17) (2024-10-08)


### Bug Fixes

* use Stream wrapper class ([ba0e913](https://github.com/oclif/table/commit/ba0e913ab7fbcba71267a7487086040fba17f5e5))



## [0.1.16](https://github.com/oclif/table/compare/0.1.15...0.1.16) (2024-10-08)


### Bug Fixes

* dont use stream if test ([1d44eb3](https://github.com/oclif/table/commit/1d44eb32680c15e428f9f0d7b77a4fc8483f383c))
* dont use stream if test ([74c4e34](https://github.com/oclif/table/commit/74c4e34428ad5913632860f6f9c75b0b2088a4d1))
* use 0 for stdout stream ([13bb59f](https://github.com/oclif/table/commit/13bb59f0bb5edd6b92d9e2f73c7acb9029b01949))



## [0.1.15](https://github.com/oclif/table/compare/0.1.14...0.1.15) (2024-10-08)


### Bug Fixes

* only print last valid frame ([b763bf7](https://github.com/oclif/table/commit/b763bf7b889651908ba642da0e42fa74839af71f))



## [0.1.14](https://github.com/oclif/table/compare/0.1.13...0.1.14) (2024-10-06)


### Bug Fixes

* **deps:** bump @types/react from 18.3.10 to 18.3.11 ([b463bdc](https://github.com/oclif/table/commit/b463bdc0b154e41bd50f32fa49feab78b2fbe0ae))



## [0.1.13](https://github.com/oclif/table/compare/0.1.12...0.1.13) (2024-10-04)


### Bug Fixes

* better fix for center aligned wrapped text ([ae049a8](https://github.com/oclif/table/commit/ae049a8a5b77b1e398ab2b53a90f151a5a1b3f3e))
* center wrapped text ([53d51bc](https://github.com/oclif/table/commit/53d51bc4002c78f1f73222063bbfa59804512744))
* handle wrapping of multiline strings ([742dc27](https://github.com/oclif/table/commit/742dc27ad1391c2cf9bc9bb3c0cafedcd2c559a5))
* remove newlines when truncating text ([f42e550](https://github.com/oclif/table/commit/f42e550e3c4b22e95c3278af41a055c946727f07))



## [0.1.12](https://github.com/oclif/table/compare/0.1.11...0.1.12) (2024-10-03)


### Bug Fixes

* move @types/react to deps ([72028f0](https://github.com/oclif/table/commit/72028f0da8a7e64a145ea676b3eb3cbca9242d47))



## [0.1.11](https://github.com/oclif/table/compare/0.1.10...0.1.11) (2024-10-03)


### Bug Fixes

* account for columnGap when sizing multiple tables ([a2b816c](https://github.com/oclif/table/commit/a2b816c9ff9edef4c2bb19abd6b799ae6a702acc))
* links ([ab71e39](https://github.com/oclif/table/commit/ab71e39a9d7f64ce7e3dd8e138c7c99abf4dd9cd))
* remove orientation prop ([36415d9](https://github.com/oclif/table/commit/36415d9acd9a9270fe67faefb2f60c841d6ae9ce))
* right alignment ([ab3f94b](https://github.com/oclif/table/commit/ab3f94b12f6385a4e31b00c43d5303f753da3413))
* wrapping and alignment ([bbe9e90](https://github.com/oclif/table/commit/bbe9e90918528c0194580e6b8d9adfbcadaf258a))



## [0.1.10](https://github.com/oclif/table/compare/0.1.9...0.1.10) (2024-09-28)


### Bug Fixes

* **deps:** bump @types/react from 18.3.3 to 18.3.10 ([769bc2a](https://github.com/oclif/table/commit/769bc2a3cfe7f420c2eae684546e2fbabab0c18e))



## [0.1.9](https://github.com/oclif/table/compare/0.1.8...0.1.9) (2024-09-25)


### Bug Fixes

* newline after table ([fcb6029](https://github.com/oclif/table/commit/fcb602926d4be844e839c17daeb8f15e490eaab8))



## [0.1.8](https://github.com/oclif/table/compare/0.1.7...0.1.8) (2024-09-25)


### Bug Fixes

* **deps:** bump micromatch from 4.0.7 to 4.0.8 ([d7ffdde](https://github.com/oclif/table/commit/d7ffdde9de2f7038fcd7a4eeacfff6a6d35251fa))



## [0.1.7](https://github.com/oclif/table/compare/0.1.6...0.1.7) (2024-09-24)


### Bug Fixes

* calculate width of wrapped ansi ([796359e](https://github.com/oclif/table/commit/796359e6f0c66a82c1f01ec36b6e1273e4721d4a))



## [0.1.6](https://github.com/oclif/table/compare/0.1.5...0.1.6) (2024-09-24)


### Bug Fixes

* remove dead code ([16111a2](https://github.com/oclif/table/commit/16111a279fff48ee346c23f708040f85f28b2779))



## [0.1.5](https://github.com/oclif/table/compare/0.1.4...0.1.5) (2024-09-24)


### Bug Fixes

* remove dead code ([5ff46d5](https://github.com/oclif/table/commit/5ff46d5fb8d0816ff0718be2df8a1d407dbb17d8))



## [0.1.4](https://github.com/oclif/table/compare/0.1.3...0.1.4) (2024-09-24)


### Bug Fixes

* fine tune wrapping ([336ec17](https://github.com/oclif/table/commit/336ec172bf3c1809a82223eef88235ac345e56e8))



## [0.1.3](https://github.com/oclif/table/compare/0.1.2...0.1.3) (2024-09-24)


### Bug Fixes

* **deps:** bump path-to-regexp from 6.2.2 to 6.3.0 ([394483b](https://github.com/oclif/table/commit/394483b03555b766aa0e0ecd72b4a4ab4f630b0f))



## [0.1.2](https://github.com/oclif/table/compare/0.1.1...0.1.2) (2024-09-23)


### Bug Fixes

* rename things ([d32e889](https://github.com/oclif/table/commit/d32e889caa383d7f1bdbe7b4b0ec99f2e31a2a69))



## [0.1.1](https://github.com/oclif/table/compare/0.1.0...0.1.1) (2024-09-23)


### Bug Fixes

* rename makeTable to printTable ([4d7a229](https://github.com/oclif/table/commit/4d7a229270750693e29c6474bc7615747a1dd4ee))



# [0.1.0](https://github.com/oclif/table/compare/20dd4c0451f6866557845da4e515cbaf1de50f20...0.1.0) (2024-09-23)


### Bug Fixes

* border presets ([b69a75a](https://github.com/oclif/table/commit/b69a75abb6c30ab23a4b6d9d49e7b18e82d8c0d4))
* dont render title if not provided ([b8985f6](https://github.com/oclif/table/commit/b8985f6016f12414cddc433f52a15156aee95295))
* dont truncate header ([900ecaf](https://github.com/oclif/table/commit/900ecaf6a302eaa21d378ecc791b36951a9e2caf))
* handle zero width characters ([d57a948](https://github.com/oclif/table/commit/d57a948c88a00da6e420723fbab27c0749ad81d7))
* handle zero width characters ([62548ad](https://github.com/oclif/table/commit/62548ad69a84f22f4dee5251d4512ab3d05832bf))
* truncation and padding ([ee688e7](https://github.com/oclif/table/commit/ee688e7cc1e919d6685917aa530bbd638622dd09))


### Features

* add some polish ([a2a1c81](https://github.com/oclif/table/commit/a2a1c81f46a4fdb2ca5c82bbca8f7d95273316f9))
* add title and examples ([406b4aa](https://github.com/oclif/table/commit/406b4aa3b284fa81ecb9d9f0238742d46aaff5f8))
* allow column specific settings ([5d975cb](https://github.com/oclif/table/commit/5d975cb98ebcec4531a8343ea5d4ab8b2855955e))
* automatic truncating ([20dd4c0](https://github.com/oclif/table/commit/20dd4c0451f6866557845da4e515cbaf1de50f20))
* clean up and sort with fn ([e758b0e](https://github.com/oclif/table/commit/e758b0e8455571f5e7fc165696999349ec716601))
* filtering and sorting options ([38efda2](https://github.com/oclif/table/commit/38efda2cc6b1ad3cb8eaed3ee47411f6c658042a))
* make customizable ([6fa62ef](https://github.com/oclif/table/commit/6fa62efe889c9b80a2f8a347ddb4598f14cf7bdf))
* maxWidth ([0b783b0](https://github.com/oclif/table/commit/0b783b09b4f42be51018d150aa9aa83f77f50f72))
* simplify filtering ([bf20670](https://github.com/oclif/table/commit/bf20670d30397d2b851a4e822a0e5d151423ef36))
* support all margins ([2b5d84a](https://github.com/oclif/table/commit/2b5d84ac6d7b335b7b57c305901836ec441ad6b8))
* support borderColor ([f858ad5](https://github.com/oclif/table/commit/f858ad5c4b60aa4f11ceadcbf99810eb1305aa66))
* support borderColor ([272d578](https://github.com/oclif/table/commit/272d57898a936242cc9e2be4872be2124969e53c))
* support noStyle option ([0de83e9](https://github.com/oclif/table/commit/0de83e9c2888b47219c22ec4e1fa55fad2b902b0))
* support vertical orientation ([2dc2609](https://github.com/oclif/table/commit/2dc2609cfdb7032b204a85989861554e653e53e7))



