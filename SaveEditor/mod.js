var d2s = (function (e) {
  var t = {};
  function r(i) {
    if (t[i]) return t[i].exports;
    var a = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function (e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (r.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (r.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var a in e)
          r.d(
            i,
            a,
            function (t) {
              return e[t];
            }.bind(null, a)
          );
      return i;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = 9))
  );
})([
  function (e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.BitWriter = void 0);
    var i = (function () {
      function e(e) {
        void 0 === e && (e = 8192),
          (this.littleEndian = !0),
          (this.offset = 0),
          (this.length = 0),
          (this.bits = new Uint8Array(e));
      }
      return (
        (e.prototype.WriteBit = function (e) {
          if (this.offset >= this.bits.length) {
            var t = new Uint8Array(this.bits.length + 8192);
            t.set(this.bits, 0), (this.bits = t);
          }
          return (
            (this.bits[this.offset++] = e),
            this.offset > this.length && this.length++,
            this
          );
        }),
        (e.prototype.WriteBits = function (e, t) {
          for (var r = 0; r < t; r++) this.WriteBit(e[r]);
          return this;
        }),
        (e.prototype.WriteBytes = function (e, t) {
          void 0 === t && (t = 8 * e.length);
          var r = new Uint8Array(t);
          return (
            e.reduce(function (e, t) {
              return (
                t
                  .toString(2)
                  .padStart(8, '0')
                  .split('')
                  .reverse()
                  .map(function (e) {
                    return parseInt(e, 2);
                  })
                  .forEach(function (t) {
                    return (r[e++] = t);
                  }),
                e
              );
            }, 0),
            this.WriteBits(r, t)
          );
        }),
        (e.prototype.WriteArray = function (e, t) {
          return void 0 === t && (t = 8 * e.length), this.WriteBytes(e, t);
        }),
        (e.prototype.WriteByte = function (e, t) {
          void 0 === t && (t = 8);
          var r = new Uint8Array(1);
          return new DataView(r.buffer).setUint8(0, e), this.WriteBytes(r, t);
        }),
        (e.prototype.WriteUInt8 = function (e, t) {
          return void 0 === t && (t = 8), this.WriteByte(e, t);
        }),
        (e.prototype.WriteUInt16 = function (e, t) {
          void 0 === t && (t = 16);
          var r = new Uint8Array(2);
          return (
            new DataView(r.buffer).setUint16(0, e, this.littleEndian),
            this.WriteBytes(r, t)
          );
        }),
        (e.prototype.WriteUInt32 = function (e, t) {
          void 0 === t && (t = 32);
          var r = new Uint8Array(4);
          return (
            new DataView(r.buffer).setUint32(0, e, this.littleEndian),
            this.WriteBytes(r, t)
          );
        }),
        (e.prototype.WriteString = function (e, t) {
          var r = new TextEncoder().encode(e);
          return this.WriteBytes(r, 8 * t);
        }),
        (e.prototype.SeekBit = function (e) {
          return (
            (this.offset = e),
            this.offset > this.length && (this.length = this.offset),
            this
          );
        }),
        (e.prototype.SeekByte = function (e) {
          return this.SeekBit(8 * e);
        }),
        (e.prototype.PeekBytes = function (e) {
          for (var t = new Uint8Array(e), r = 0, i = 0, a = 0; a < 8 * e; ++a)
            this.bits[this.offset + a] && (t[r] |= (1 << i) & 255),
              ++i >= 8 && (++r, (i = 0));
          return t;
        }),
        (e.prototype.Align = function () {
          return (
            (this.offset = (this.offset + 7) & -8),
            this.offset > this.length && (this.length = this.offset),
            this
          );
        }),
        (e.prototype.ToArray = function () {
          for (
            var e = new Uint8Array((this.length - 1) / 8 + 1),
              t = 0,
              r = 0,
              i = 0;
            i < this.length;
            ++i
          )
            this.bits[i] && (e[t] |= (1 << r) & 255),
              ++r >= 8 && (++t, (r = 0));
          return e;
        }),
        e
      );
    })();
    t.BitWriter = i;
  },
  function (e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.BitReader = void 0);
    var i = (function () {
      function e(e) {
        var t = this;
        (this.littleEndian = !0), (this.offset = 0);
        var r = new Uint8Array(e);
        (this.bits = new Uint8Array(8 * r.length)),
          r.reduce(function (e, r) {
            return (
              r
                .toString(2)
                .padStart(8, '0')
                .split('')
                .reverse()
                .map(function (e) {
                  return parseInt(e, 2);
                })
                .forEach(function (r) {
                  return (t.bits[e++] = r);
                }),
              e
            );
          }, 0);
      }
      return (
        (e.prototype.ReadBit = function () {
          return this.bits[this.offset++];
        }),
        (e.prototype.ReadBitArray = function (e) {
          for (var t = new Uint8Array(e), r = 0; r < e; r++)
            t[r] = this.bits[this.offset++];
          return t;
        }),
        (e.prototype.ReadBits = function (e, t) {
          for (var r = 0, i = 0, a = 0; a < t; a++)
            this.bits[this.offset + a] && (e[r] |= (1 << i) & 255),
              8 == ++i && (r++, (i = 0));
          return (this.offset += t), e;
        }),
        (e.prototype.ReadBytes = function (e) {
          return this.ReadBits(new Uint8Array(e), 8 * e);
        }),
        (e.prototype.ReadArray = function (e) {
          return this.ReadBytes(e);
        }),
        (e.prototype.ReadByte = function (e) {
          return (
            void 0 === e && (e = 8),
            new DataView(this.ReadBits(new Uint8Array(1), e).buffer).getUint8(0)
          );
        }),
        (e.prototype.ReadUInt8 = function (e) {
          return void 0 === e && (e = 8), this.ReadByte(e);
        }),
        (e.prototype.ReadUInt16 = function (e) {
          return (
            void 0 === e && (e = 16),
            new DataView(this.ReadBits(new Uint8Array(2), e).buffer).getUint16(
              0,
              this.littleEndian
            )
          );
        }),
        (e.prototype.ReadUInt32 = function (e) {
          return (
            void 0 === e && (e = 32),
            new DataView(this.ReadBits(new Uint8Array(4), e).buffer).getUint32(
              0,
              this.littleEndian
            )
          );
        }),
        (e.prototype.ReadString = function (e) {
          var t = this.ReadBytes(e).buffer;
          return new TextDecoder().decode(t);
        }),
        (e.prototype.ReadNullTerminatedString = function () {
          for (var e = this.offset; this.ReadByte(); );
          var t = this.offset - 8,
            r = this.SeekBit(e).ReadBytes((t - e) / 8);
          return this.SeekBit(t + 8), new TextDecoder().decode(r);
        }),
        (e.prototype.SkipBits = function (e) {
          return (this.offset += e), this;
        }),
        (e.prototype.SkipBytes = function (e) {
          return this.SkipBits(8 * e);
        }),
        (e.prototype.SeekBit = function (e) {
          return (this.offset = e), this;
        }),
        (e.prototype.SeekByte = function (e) {
          return this.SeekBit(8 * e);
        }),
        (e.prototype.Align = function () {
          return (this.offset = (this.offset + 7) & -8), this;
        }),
        e
      );
    })();
    t.BitReader = i;
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, i) {
              void 0 === i && (i = r),
                Object.defineProperty(e, i, {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                });
            }
          : function (e, t, r, i) {
              void 0 === i && (i = r), (e[i] = t[r]);
            }),
      a =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
            }
          : function (e, t) {
              e.default = t;
            }),
      n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              'default' !== r && Object.hasOwnProperty.call(e, r) && i(t, e, r);
          return a(t, e), t;
        },
      s =
        (this && this.__awaiter) ||
        function (e, t, r, i) {
          return new (r || (r = Promise))(function (a, n) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                n(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      o =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            i,
            a,
            n,
            s = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (n = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this;
              }),
            n
          );
          function o(n) {
            return function (o) {
              return (function (n) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (a =
                          2 & n[0]
                            ? i.return
                            : n[0]
                            ? i.throw || ((a = i.return) && a.call(i), 0)
                            : i.next) &&
                        !(a = a.call(i, n[1])).done)
                    )
                      return a;
                    switch (((i = 0), a && (n = [2 & n[0], a.value]), n[0])) {
                      case 0:
                      case 1:
                        a = n;
                        break;
                      case 4:
                        return s.label++, { value: n[1], done: !1 };
                      case 5:
                        s.label++, (i = n[1]), (n = [0]);
                        continue;
                      case 7:
                        (n = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== n[0] && 2 !== n[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === n[0] &&
                          (!a || (n[1] > a[0] && n[1] < a[3]))
                        ) {
                          s.label = n[1];
                          break;
                        }
                        if (6 === n[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = n);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(n);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    n = t.call(e, s);
                  } catch (e) {
                    (n = [6, e]), (i = 0);
                  } finally {
                    r = a = 0;
                  }
                if (5 & n[0]) throw n[1];
                return { value: n[0] ? n[1] : void 0, done: !0 };
              })([n, o]);
            };
          }
        };
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.fixHeader =
        t.writeHeaderData =
        t.writeHeader =
        t.readHeaderData =
        t.readHeader =
          void 0);
    var c = r(0);
    function l(e) {
      return s(this, void 0, void 0, function () {
        return o(this, function (t) {
          switch (t.label) {
            case 0:
              switch (e) {
                case 96:
                  return [3, 1];
              }
              return [3, 3];
            case 1:
              return [
                4,
                Promise.resolve().then(function () {
                  return n(r(3));
                }),
              ];
            case 2:
              return [2, t.sent()];
            case 3:
              return [
                4,
                Promise.resolve().then(function () {
                  return n(r(3));
                }),
              ];
            case 4:
              return [2, t.sent()];
          }
        });
      });
    }
    (t.readHeader = function (e, t) {
      return s(this, void 0, void 0, function () {
        return o(this, function (r) {
          if (
            ((e.header = {}),
            (e.header.identifier = t
              .ReadUInt32()
              .toString(16)
              .padStart(8, '0')),
            'aa55aa55' != e.header.identifier)
          )
            throw new Error(
              "D2S identifier 'aa55aa55' not found at position " +
                (t.offset - 32)
            );
          return (e.header.version = t.ReadUInt32()), [2];
        });
      });
    }),
      (t.readHeaderData = function (e, t, r) {
        return s(this, void 0, void 0, function () {
          var i;
          return o(this, function (a) {
            switch (a.label) {
              case 0:
                return [4, l(e.header.version)];
              case 1:
                if (null == (i = a.sent()))
                  throw new Error('Cannot parse version: ' + e.header.version);
                return i.readHeader(e, t, r), [2];
            }
          });
        });
      }),
      (t.writeHeader = function (e) {
        return s(this, void 0, void 0, function () {
          var t;
          return o(this, function (r) {
            return (
              (t = new c.BitWriter())
                .WriteUInt32(parseInt(e.header.identifier, 16))
                .WriteUInt32(e.header.version),
              [2, t.ToArray()]
            );
          });
        });
      }),
      (t.writeHeaderData = function (e, t) {
        return s(this, void 0, void 0, function () {
          var r, i;
          return o(this, function (a) {
            switch (a.label) {
              case 0:
                return (r = new c.BitWriter()), [4, l(e.header.version)];
              case 1:
                if (null == (i = a.sent()))
                  throw new Error('Cannot parse version: ' + e.header.version);
                return i.writeHeader(e, r, t), [2, r.ToArray()];
            }
          });
        });
      }),
      (t.fixHeader = function (e) {
        return s(this, void 0, void 0, function () {
          var t, r, i, a;
          return o(this, function (n) {
            for (
              t = 0,
                r = e.length / 8,
                e.SeekByte(8).WriteUInt32(r),
                e.SeekByte(12).WriteUInt32(0),
                i = 0;
              i < r;
              i++
            )
              (a = e.SeekByte(i).PeekBytes(1)[0]),
                2147483648 & t && (a += 1),
                (t = a + 2 * t),
                (t >>>= 0);
            return e.SeekByte(12).WriteUInt32(t), [2];
          });
        });
      });
  },
  function (e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.writeHeader = t.readHeader = void 0);
    var i = r(1),
      a = r(0),
      n = ['normal', 'nm', 'hell'];
    function s(e, t) {
      if ('' === e) return 0;
      if (!e) return -1;
      var r = t.skills.findIndex(function (t) {
        return t && t.s == e;
      });
      return r >= 0 ? r : 0;
    }
    function o(e) {
      var t = {},
        r = new i.BitReader(e);
      return (
        (t.act_i = {}),
        (t.act_i.introduced = 1 === r.ReadUInt16()),
        (t.act_i.den_of_evil = l(r.ReadArray(2))),
        (t.act_i.sisters_burial_grounds = l(r.ReadArray(2))),
        (t.act_i.tools_of_the_trade = l(r.ReadArray(2))),
        (t.act_i.the_search_for_cain = l(r.ReadArray(2))),
        (t.act_i.the_forgotten_tower = l(r.ReadArray(2))),
        (t.act_i.sisters_to_the_slaughter = l(r.ReadArray(2))),
        (t.act_i.completed = 1 === r.ReadUInt16()),
        (t.act_ii = {}),
        (t.act_ii.introduced = 1 === r.ReadUInt16()),
        (t.act_ii.radaments_lair = l(r.ReadArray(2))),
        (t.act_ii.the_horadric_staff = l(r.ReadArray(2))),
        (t.act_ii.tainted_sun = l(r.ReadArray(2))),
        (t.act_ii.arcane_sanctuary = l(r.ReadArray(2))),
        (t.act_ii.the_summoner = l(r.ReadArray(2))),
        (t.act_ii.the_seven_tombs = l(r.ReadArray(2))),
        (t.act_ii.completed = 1 === r.ReadUInt16()),
        (t.act_iii = {}),
        (t.act_iii.introduced = 1 === r.ReadUInt16()),
        (t.act_iii.lam_esens_tome = l(r.ReadArray(2))),
        (t.act_iii.khalims_will = l(r.ReadArray(2))),
        (t.act_iii.blade_of_the_old_religion = l(r.ReadArray(2))),
        (t.act_iii.the_golden_bird = l(r.ReadArray(2))),
        (t.act_iii.the_blackened_temple = l(r.ReadArray(2))),
        (t.act_iii.the_guardian = l(r.ReadArray(2))),
        (t.act_iii.completed = 1 === r.ReadUInt16()),
        (t.act_iv = {}),
        (t.act_iv.introduced = 1 === r.ReadUInt16()),
        (t.act_iv.the_fallen_angel = l(r.ReadArray(2))),
        (t.act_iv.terrors_end = l(r.ReadArray(2))),
        (t.act_iv.hellforge = l(r.ReadArray(2))),
        (t.act_iv.completed = 1 === r.ReadUInt16()),
        r.SkipBytes(10),
        (t.act_v = {}),
        (t.act_v.introduced = 1 === r.ReadUInt16()),
        (t.act_v.siege_on_harrogath = l(r.ReadArray(2))),
        (t.act_v.rescue_on_mount_arreat = l(r.ReadArray(2))),
        (t.act_v.prison_of_ice = l(r.ReadArray(2))),
        (t.act_v.betrayal_of_harrogath = l(r.ReadArray(2))),
        (t.act_v.rite_of_passage = l(r.ReadArray(2))),
        (t.act_v.eve_of_destruction = l(r.ReadArray(2))),
        (t.act_v.completed = 1 === r.ReadUInt16()),
        r.SkipBytes(12),
        t
      );
    }
    function c(e) {
      var t = new a.BitWriter(96);
      t.length = 768;
      var r = +e.act_v.completed || +e.act_v.eve_of_destruction.is_completed;
      return t
        .WriteUInt16(+e.act_i.introduced)
        .WriteArray(d(e.act_i.den_of_evil))
        .WriteArray(d(e.act_i.sisters_burial_grounds))
        .WriteArray(d(e.act_i.tools_of_the_trade))
        .WriteArray(d(e.act_i.the_search_for_cain))
        .WriteArray(d(e.act_i.the_forgotten_tower))
        .WriteArray(d(e.act_i.sisters_to_the_slaughter))
        .WriteUInt16(
          +e.act_i.completed || +e.act_i.sisters_to_the_slaughter.is_completed
        )
        .WriteUInt16(
          +e.act_ii.introduced || +e.act_i.sisters_to_the_slaughter.is_completed
        )
        .WriteArray(d(e.act_ii.radaments_lair))
        .WriteArray(d(e.act_ii.the_horadric_staff))
        .WriteArray(d(e.act_ii.tainted_sun))
        .WriteArray(d(e.act_ii.arcane_sanctuary))
        .WriteArray(d(e.act_ii.the_summoner))
        .WriteArray(d(e.act_ii.the_seven_tombs))
        .WriteUInt16(
          +e.act_ii.completed || +e.act_ii.the_seven_tombs.is_completed
        )
        .WriteUInt16(
          +e.act_iii.introduced || +e.act_ii.the_seven_tombs.is_completed
        )
        .WriteArray(d(e.act_iii.lam_esens_tome))
        .WriteArray(d(e.act_iii.khalims_will))
        .WriteArray(d(e.act_iii.blade_of_the_old_religion))
        .WriteArray(d(e.act_iii.the_golden_bird))
        .WriteArray(d(e.act_iii.the_blackened_temple))
        .WriteArray(d(e.act_iii.the_guardian))
        .WriteUInt16(
          +e.act_iii.completed || +e.act_iii.the_guardian.is_completed
        )
        .WriteUInt16(
          +e.act_iv.introduced || +e.act_iii.the_guardian.is_completed
        )
        .WriteArray(d(e.act_iv.the_fallen_angel))
        .WriteArray(d(e.act_iv.terrors_end))
        .WriteArray(d(e.act_iv.hellforge))
        .WriteUInt16(+e.act_iv.completed || +e.act_iv.terrors_end.is_completed)
        .WriteArray(new Uint8Array(6))
        .WriteUInt16(+e.act_v.introduced || +e.act_iv.terrors_end.is_completed)
        .WriteArray(new Uint8Array(4))
        .WriteArray(d(e.act_v.siege_on_harrogath))
        .WriteArray(d(e.act_v.rescue_on_mount_arreat))
        .WriteArray(d(e.act_v.prison_of_ice))
        .WriteArray(d(e.act_v.betrayal_of_harrogath))
        .WriteArray(d(e.act_v.rite_of_passage))
        .WriteArray(d(e.act_v.eve_of_destruction))
        .WriteUInt8(r)
        .WriteUInt8(r ? 128 : 0)
        .WriteArray(new Uint8Array(12))
        .ToArray();
    }
    function l(e) {
      var t = {},
        r = new i.BitReader(e);
      return (
        (t.is_completed = 1 === r.ReadBit()),
        (t.is_requirement_completed = 1 === r.ReadBit()),
        (t.is_received = 1 === r.ReadBit()),
        1 === r.ReadBit() && (t.unk3 = !0),
        1 === r.ReadBit() && (t.unk4 = !0),
        1 === r.ReadBit() && (t.unk5 = !0),
        1 === r.ReadBit() && (t.unk6 = !0),
        1 === r.ReadBit() && (t.consumed_scroll = !0),
        1 === r.ReadBit() && (t.unk8 = !0),
        1 === r.ReadBit() && (t.unk9 = !0),
        1 === r.ReadBit() && (t.unk10 = !0),
        1 === r.ReadBit() && (t.unk11 = !0),
        (t.closed = 1 === r.ReadBit()),
        (t.done_recently = 1 === r.ReadBit()),
        1 === r.ReadBit() && (t.unk14 = !0),
        1 === r.ReadBit() && (t.unk15 = !0),
        t
      );
    }
    function d(e) {
      var t = new a.BitWriter(2);
      return (
        (t.length = 16),
        t.WriteBit(+e.is_completed),
        t.WriteBit(+e.is_requirement_completed),
        t.WriteBit(+e.is_received),
        t.WriteBit(+e.unk3),
        t.WriteBit(+e.unk4),
        t.WriteBit(+e.unk5),
        t.WriteBit(+e.unk6),
        t.WriteBit(+e.consumed_scroll),
        t.WriteBit(+e.unk8),
        t.WriteBit(+e.unk9),
        t.WriteBit(+e.unk10),
        t.WriteBit(+e.unk11),
        t.WriteBit(+e.closed),
        t.WriteBit(+e.done_recently),
        t.WriteBit(+e.unk14),
        t.WriteBit(+e.unk15),
        t.ToArray()
      );
    }
    function u(e) {
      var t = {},
        r = new i.BitReader(e);
      return (
        r.SkipBytes(2),
        (t.act_i = {}),
        (t.act_i.rogue_encampement = 1 === r.ReadBit()),
        (t.act_i.cold_plains = 1 === r.ReadBit()),
        (t.act_i.stony_field = 1 === r.ReadBit()),
        (t.act_i.dark_woods = 1 === r.ReadBit()),
        (t.act_i.black_marsh = 1 === r.ReadBit()),
        (t.act_i.outer_cloister = 1 === r.ReadBit()),
        (t.act_i.jail_lvl_1 = 1 === r.ReadBit()),
        (t.act_i.inner_cloister = 1 === r.ReadBit()),
        (t.act_i.catacombs_lvl_2 = 1 === r.ReadBit()),
        (t.act_ii = {}),
        (t.act_ii.lut_gholein = 1 === r.ReadBit()),
        (t.act_ii.sewers_lvl_2 = 1 === r.ReadBit()),
        (t.act_ii.dry_hills = 1 === r.ReadBit()),
        (t.act_ii.halls_of_the_dead_lvl_2 = 1 === r.ReadBit()),
        (t.act_ii.far_oasis = 1 === r.ReadBit()),
        (t.act_ii.lost_city = 1 === r.ReadBit()),
        (t.act_ii.palace_cellar_lvl_1 = 1 === r.ReadBit()),
        (t.act_ii.arcane_sanctuary = 1 === r.ReadBit()),
        (t.act_ii.canyon_of_the_magi = 1 === r.ReadBit()),
        (t.act_iii = {}),
        (t.act_iii.kurast_docks = 1 === r.ReadBit()),
        (t.act_iii.spider_forest = 1 === r.ReadBit()),
        (t.act_iii.great_marsh = 1 === r.ReadBit()),
        (t.act_iii.flayer_jungle = 1 === r.ReadBit()),
        (t.act_iii.lower_kurast = 1 === r.ReadBit()),
        (t.act_iii.kurast_bazaar = 1 === r.ReadBit()),
        (t.act_iii.upper_kurast = 1 === r.ReadBit()),
        (t.act_iii.travincal = 1 === r.ReadBit()),
        (t.act_iii.durance_of_hate_lvl_2 = 1 === r.ReadBit()),
        (t.act_iv = {}),
        (t.act_iv.the_pandemonium_fortress = 1 === r.ReadBit()),
        (t.act_iv.city_of_the_damned = 1 === r.ReadBit()),
        (t.act_iv.river_of_flame = 1 === r.ReadBit()),
        (t.act_v = {}),
        (t.act_v.harrogath = 1 === r.ReadBit()),
        (t.act_v.frigid_highlands = 1 === r.ReadBit()),
        (t.act_v.arreat_plateau = 1 === r.ReadBit()),
        (t.act_v.crystalline_passage = 1 === r.ReadBit()),
        (t.act_v.halls_of_pain = 1 === r.ReadBit()),
        (t.act_v.glacial_trail = 1 === r.ReadBit()),
        (t.act_v.frozen_tundra = 1 === r.ReadBit()),
        (t.act_v.the_ancients_way = 1 === r.ReadBit()),
        (t.act_v.worldstone_keep_lvl_2 = 1 === r.ReadBit()),
        r.Align().SkipBytes(17),
        t
      );
    }
    function f(e) {
      var t = new a.BitWriter(24);
      return (
        (t.length = 192),
        t.WriteArray(new Uint8Array([2, 1])),
        e
          ? (e.act_i &&
              (t.WriteBit(+e.act_i.rogue_encampement),
              t.WriteBit(+e.act_i.cold_plains),
              t.WriteBit(+e.act_i.stony_field),
              t.WriteBit(+e.act_i.dark_woods),
              t.WriteBit(+e.act_i.black_marsh),
              t.WriteBit(+e.act_i.outer_cloister),
              t.WriteBit(+e.act_i.jail_lvl_1),
              t.WriteBit(+e.act_i.inner_cloister),
              t.WriteBit(+e.act_i.catacombs_lvl_2)),
            e.act_ii &&
              (t.WriteBit(+e.act_ii.lut_gholein),
              t.WriteBit(+e.act_ii.sewers_lvl_2),
              t.WriteBit(+e.act_ii.dry_hills),
              t.WriteBit(+e.act_ii.halls_of_the_dead_lvl_2),
              t.WriteBit(+e.act_ii.far_oasis),
              t.WriteBit(+e.act_ii.lost_city),
              t.WriteBit(+e.act_ii.palace_cellar_lvl_1),
              t.WriteBit(+e.act_ii.arcane_sanctuary),
              t.WriteBit(+e.act_ii.canyon_of_the_magi)),
            e.act_iii &&
              (t.WriteBit(+e.act_iii.kurast_docks),
              t.WriteBit(+e.act_iii.spider_forest),
              t.WriteBit(+e.act_iii.great_marsh),
              t.WriteBit(+e.act_iii.flayer_jungle),
              t.WriteBit(+e.act_iii.lower_kurast),
              t.WriteBit(+e.act_iii.kurast_bazaar),
              t.WriteBit(+e.act_iii.upper_kurast),
              t.WriteBit(+e.act_iii.travincal),
              t.WriteBit(+e.act_iii.durance_of_hate_lvl_2)),
            e.act_iv &&
              (t.WriteBit(+e.act_iv.the_pandemonium_fortress),
              t.WriteBit(+e.act_iv.city_of_the_damned),
              t.WriteBit(+e.act_iv.river_of_flame)),
            e.act_v &&
              (t.WriteBit(+e.act_v.harrogath),
              t.WriteBit(+e.act_v.frigid_highlands),
              t.WriteBit(+e.act_v.arreat_plateau),
              t.WriteBit(+e.act_v.crystalline_passage),
              t.WriteBit(+e.act_v.halls_of_pain),
              t.WriteBit(+e.act_v.glacial_trail),
              t.WriteBit(+e.act_v.frozen_tundra),
              t.WriteBit(+e.act_v.the_ancients_way),
              t.WriteBit(+e.act_v.worldstone_keep_lvl_2)))
          : t.WriteArray(new Uint8Array([255, 255, 255, 255, 127])),
        t.Align().WriteArray(new Uint8Array(17)),
        t.ToArray()
      );
    }
    (t.readHeader = function (e, t, r) {
      var a, s, c, l, d, f, _, h;
      (e.header.filesize = t.ReadUInt32()),
        (e.header.checksum = t.ReadUInt32().toString(16).padStart(8, '0')),
        t.SkipBytes(4),
        e.header.version > 97 && t.SeekByte(267),
        (e.header.name = t.ReadString(16).replace(/\0/g, '')),
        e.header.version > 97 && t.SeekByte(36),
        (e.header.status =
          ((d = t.ReadUInt8()),
          ((f = {}).hardcore = 1 == ((d >>> 2) & 1)),
          (f.died = 1 == ((d >>> 3) & 1)),
          (f.expansion = 1 == ((d >>> 5) & 1)),
          (f.ladder = 1 == ((d >>> 6) & 1)),
          f)),
        (e.header.progression = t.ReadUInt8()),
        (e.header.active_arms = t.ReadUInt16()),
        (e.header.class = r.classes[t.ReadUInt8()].n),
        t.SkipBytes(2),
        (e.header.level = t.ReadUInt8()),
        (e.header.created = t.ReadUInt32()),
        (e.header.last_played = t.ReadUInt32()),
        t.SkipBytes(4),
        (e.header.assigned_skills = (function (e, t) {
          for (var r = [], a = new i.BitReader(e), n = 0; n < 16; n++) {
            var s = a.ReadUInt32(),
              o = t.skills[s];
            o && r.push(o.s);
          }
          return r;
        })(t.ReadArray(64), r)),
        (e.header.left_skill =
          null === (a = r.skills[t.ReadUInt32()]) || void 0 === a
            ? void 0
            : a.s),
        (e.header.right_skill =
          null === (s = r.skills[t.ReadUInt32()]) || void 0 === s
            ? void 0
            : s.s),
        (e.header.left_swap_skill =
          null === (c = r.skills[t.ReadUInt32()]) || void 0 === c
            ? void 0
            : c.s),
        (e.header.right_swap_skill =
          null === (l = r.skills[t.ReadUInt32()]) || void 0 === l
            ? void 0
            : l.s),
        (e.header.menu_appearance = (function (e, t) {
          var r = {},
            a = new i.BitReader(e),
            n = a.ReadArray(16),
            s = a.ReadArray(16);
          return (
            (r.head = { graphic: n[0], tint: s[0] }),
            (r.torso = { graphic: n[1], tint: s[1] }),
            (r.legs = { graphic: n[2], tint: s[2] }),
            (r.right_arm = { graphic: n[3], tint: s[3] }),
            (r.left_arm = { graphic: n[4], tint: s[4] }),
            (r.right_hand = { graphic: n[5], tint: s[5] }),
            (r.left_hand = { graphic: n[6], tint: s[6] }),
            (r.shield = { graphic: n[7], tint: s[7] }),
            (r.special1 = { graphic: n[8], tint: s[8] }),
            (r.special2 = { graphic: n[9], tint: s[9] }),
            (r.special3 = { graphic: n[10], tint: s[10] }),
            (r.special4 = { graphic: n[11], tint: s[11] }),
            (r.special5 = { graphic: n[12], tint: s[12] }),
            (r.special6 = { graphic: n[13], tint: s[13] }),
            (r.special7 = { graphic: n[14], tint: s[14] }),
            (r.special8 = { graphic: n[15], tint: s[15] }),
            r
          );
        })(t.ReadArray(32))),
        (e.header.difficulty =
          ((_ = t.ReadArray(3)),
          ((h = {}).Normal = _[0]),
          (h.Nightmare = _[1]),
          (h.Hell = _[2]),
          h)),
        (e.header.map_id = t.ReadUInt32()),
        t.SkipBytes(2),
        (e.header.dead_merc = t.ReadUInt16()),
        (e.header.merc_id = t.ReadUInt32().toString(16)),
        (e.header.merc_name_id = t.ReadUInt16()),
        (e.header.merc_type = t.ReadUInt16()),
        (e.header.merc_experience = t.ReadUInt32()),
        t.SkipBytes(144),
        t.SkipBytes(4),
        t.SkipBytes(4),
        t.SkipBytes(2),
        (e.header.quests_normal = o(t.ReadArray(96))),
        (e.header.quests_nm = o(t.ReadArray(96))),
        (e.header.quests_hell = o(t.ReadArray(96))),
        t.SkipBytes(2),
        t.SkipBytes(4),
        t.SkipBytes(2),
        (e.header.waypoints = (function (e) {
          for (var t = {}, r = new i.BitReader(e), a = 0; a < n.length; a++)
            t[n[a]] = u(r.ReadArray(24));
          return t;
        })(t.ReadArray(72))),
        t.SkipBytes(2),
        t.SkipBytes(2),
        (e.header.npcs = (function (e) {
          for (
            var t = { normal: {}, nm: {}, hell: {} },
              r = new i.BitReader(e),
              a = 0;
            a < 3;
            a++
          )
            t[n[a]] = {
              warriv_act_ii: { intro: !1, congrats: !1 },
              charsi: { intro: !1, congrats: !1 },
              warriv_act_i: { intro: !1, congrats: !1 },
              kashya: { intro: !1, congrats: !1 },
              akara: { intro: !1, congrats: !1 },
              gheed: { intro: !1, congrats: !1 },
              greiz: { intro: !1, congrats: !1 },
              jerhyn: { intro: !1, congrats: !1 },
              meshif_act_ii: { intro: !1, congrats: !1 },
              geglash: { intro: !1, congrats: !1 },
              lysnader: { intro: !1, congrats: !1 },
              fara: { intro: !1, congrats: !1 },
              drogan: { intro: !1, congrats: !1 },
              alkor: { intro: !1, congrats: !1 },
              hratli: { intro: !1, congrats: !1 },
              ashera: { intro: !1, congrats: !1 },
              cain_act_iii: { intro: !1, congrats: !1 },
              elzix: { intro: !1, congrats: !1 },
              malah: { intro: !1, congrats: !1 },
              anya: { intro: !1, congrats: !1 },
              natalya: { intro: !1, congrats: !1 },
              meshif_act_iii: { intro: !1, congrats: !1 },
              ormus: { intro: !1, congrats: !1 },
              cain_act_v: { intro: !1, congrats: !1 },
              qualkehk: { intro: !1, congrats: !1 },
              nihlathak: { intro: !1, congrats: !1 },
            };
          for (var s = 0; s < 3; s++) {
            a = 5 * s;
            ((o = t[n[s]]).warriv_act_ii.intro = 1 === r.bits[0 + 8 * a]),
              (o.charsi.intro = 1 === r.bits[2 + 8 * a]),
              (o.warriv_act_i.intro = 1 === r.bits[3 + 8 * a]),
              (o.kashya.intro = 1 === r.bits[4 + 8 * a]),
              (o.akara.intro = 1 === r.bits[5 + 8 * a]),
              (o.gheed.intro = 1 === r.bits[6 + 8 * a]),
              (o.greiz.intro = 1 === r.bits[8 + 8 * a]),
              (o.jerhyn.intro = 1 === r.bits[9 + 8 * a]),
              (o.meshif_act_ii.intro = 1 === r.bits[10 + 8 * a]),
              (o.geglash.intro = 1 === r.bits[11 + 8 * a]),
              (o.lysnader.intro = 1 === r.bits[12 + 8 * a]),
              (o.fara.intro = 1 === r.bits[13 + 8 * a]),
              (o.drogan.intro = 1 === r.bits[14 + 8 * a]),
              (o.alkor.intro = 1 === r.bits[16 + 8 * a]),
              (o.hratli.intro = 1 === r.bits[17 + 8 * a]),
              (o.ashera.intro = 1 === r.bits[18 + 8 * a]),
              (o.cain_act_iii.intro = 1 === r.bits[21 + 8 * a]),
              (o.elzix.intro = 1 === r.bits[23 + 8 * a]),
              (o.malah.intro = 1 === r.bits[24 + 8 * a]),
              (o.anya.intro = 1 === r.bits[25 + 8 * a]),
              (o.natalya.intro = 1 === r.bits[27 + 8 * a]),
              (o.meshif_act_iii.intro = 1 === r.bits[28 + 8 * a]),
              (o.ormus.intro = 1 === r.bits[31 + 8 * a]),
              (o.cain_act_v.intro = 1 === r.bits[37 + 8 * a]),
              (o.qualkehk.intro = 1 === r.bits[38 + 8 * a]),
              (o.nihlathak.intro = 1 === r.bits[39 + 8 * a]);
          }
          for (s = 0; s < 3; s++) {
            var o;
            a = 5 * s;
            ((o = t[n[s]]).warriv_act_ii.congrats =
              1 === r.bits[0 + 8 * a + 192]),
              (o.charsi.congrats = 1 === r.bits[2 + 8 * a + 192]),
              (o.warriv_act_i.congrats = 1 === r.bits[3 + 8 * a + 192]),
              (o.kashya.congrats = 1 === r.bits[4 + 8 * a + 192]),
              (o.akara.congrats = 1 === r.bits[5 + 8 * a + 192]),
              (o.gheed.congrats = 1 === r.bits[6 + 8 * a + 192]),
              (o.greiz.congrats = 1 === r.bits[8 + 8 * a + 192]),
              (o.jerhyn.congrats = 1 === r.bits[9 + 8 * a + 192]),
              (o.meshif_act_ii.congrats = 1 === r.bits[10 + 8 * a + 192]),
              (o.geglash.congrats = 1 === r.bits[11 + 8 * a + 192]),
              (o.lysnader.congrats = 1 === r.bits[12 + 8 * a + 192]),
              (o.fara.congrats = 1 === r.bits[13 + 8 * a + 192]),
              (o.drogan.congrats = 1 === r.bits[14 + 8 * a + 192]),
              (o.alkor.congrats = 1 === r.bits[16 + 8 * a + 192]),
              (o.hratli.congrats = 1 === r.bits[17 + 8 * a + 192]),
              (o.ashera.congrats = 1 === r.bits[18 + 8 * a + 192]),
              (o.cain_act_iii.congrats = 1 === r.bits[21 + 8 * a + 192]),
              (o.elzix.congrats = 1 === r.bits[23 + 8 * a + 192]),
              (o.malah.congrats = 1 === r.bits[24 + 8 * a + 192]),
              (o.anya.congrats = 1 === r.bits[25 + 8 * a + 192]),
              (o.natalya.congrats = 1 === r.bits[27 + 8 * a + 192]),
              (o.meshif_act_iii.congrats = 1 === r.bits[28 + 8 * a + 192]),
              (o.ormus.congrats = 1 === r.bits[31 + 8 * a + 192]),
              (o.cain_act_v.congrats = 1 === r.bits[37 + 8 * a + 192]),
              (o.qualkehk.congrats = 1 === r.bits[38 + 8 * a + 192]),
              (o.nihlathak.congrats = 1 === r.bits[39 + 8 * a + 192]);
          }
          return t;
        })(t.ReadArray(48)));
    }),
      (t.writeHeader = function (e, t, r) {
        var i, o;
        t.WriteUInt32(0).WriteUInt32(0),
          e.header.version > 97
            ? t.WriteArray(new Uint8Array(Array(20).fill(0)))
            : t
                .WriteArray(new Uint8Array([0, 0, 0, 0]))
                .WriteString(e.header.name, 16),
          t
            .WriteArray(
              ((i = e.header.status),
              (o = new Uint8Array(1)),
              (o[0] |= i.hardcore ? 4 : 0),
              (o[0] |= i.died ? 8 : 0),
              (o[0] |= i.expansion ? 32 : 0),
              (o[0] |= i.ladder ? 64 : 0),
              o)
            )
            .WriteUInt8(e.header.progression)
            .WriteUInt16(e.header.active_arms)
            .WriteUInt8(
              (function (e, t) {
                return e
                  ? t.classes.findIndex(function (t) {
                      return t && t.n == e;
                    })
                  : -1;
              })(e.header.class, r)
            )
            .WriteArray(new Uint8Array([16, 30]))
            .WriteUInt8(e.header.level)
            .WriteArray(new Uint8Array([0, 0, 0, 0]))
            .WriteUInt32(e.header.last_played)
            .WriteArray(new Uint8Array([255, 255, 255, 255]))
            .WriteArray(
              (function (e, t) {
                var r = new a.BitWriter(64);
                (r.length = 512), (e = e || []);
                for (var i = 0; i < 16; i++) {
                  var n = s(e[i], t);
                  n > 0 ? r.WriteUInt32(n) : r.WriteUInt32(65535);
                }
                return r.ToArray();
              })(e.header.assigned_skills, r)
            )
            .WriteUInt32(s(e.header.left_skill, r))
            .WriteUInt32(s(e.header.right_skill, r))
            .WriteUInt32(s(e.header.left_swap_skill, r))
            .WriteUInt32(s(e.header.right_swap_skill, r))
            .WriteArray(
              (function (e, t) {
                var r = new a.BitWriter(32);
                r.length = 256;
                var i = [];
                i.push(e && e.head ? e.head.graphic : 0),
                  i.push(e && e.torso ? e.torso.graphic : 0),
                  i.push(e && e.legs ? e.legs.graphic : 0),
                  i.push(e && e.right_arm ? e.right_arm.graphic : 0),
                  i.push(e && e.left_arm ? e.left_arm.graphic : 0),
                  i.push(e && e.right_hand ? e.right_hand.graphic : 0),
                  i.push(e && e.left_hand ? e.left_hand.graphic : 0),
                  i.push(e && e.shield ? e.shield.graphic : 0),
                  i.push(e && e.special1 ? e.special1.graphic : 0),
                  i.push(e && e.special2 ? e.special2.graphic : 0),
                  i.push(e && e.special3 ? e.special3.graphic : 0),
                  i.push(e && e.special4 ? e.special4.graphic : 0),
                  i.push(e && e.special5 ? e.special5.graphic : 0),
                  i.push(e && e.special6 ? e.special6.graphic : 0),
                  i.push(e && e.special7 ? e.special7.graphic : 0),
                  i.push(e && e.special8 ? e.special8.graphic : 0);
                for (var n = 0, s = i; n < s.length; n++) {
                  var o = s[n];
                  r.WriteUInt8(o);
                }
                var c = [];
                c.push(e && e.head ? e.head.tint : 0),
                  c.push(e && e.torso ? e.torso.tint : 0),
                  c.push(e && e.legs ? e.legs.tint : 0),
                  c.push(e && e.right_arm ? e.right_arm.tint : 0),
                  c.push(e && e.left_arm ? e.left_arm.tint : 0),
                  c.push(e && e.right_hand ? e.right_hand.tint : 0),
                  c.push(e && e.left_hand ? e.left_hand.tint : 0),
                  c.push(e && e.shield ? e.shield.tint : 0),
                  c.push(e && e.special1 ? e.special1.tint : 0),
                  c.push(e && e.special2 ? e.special2.tint : 0),
                  c.push(e && e.special3 ? e.special3.tint : 0),
                  c.push(e && e.special4 ? e.special4.tint : 0),
                  c.push(e && e.special5 ? e.special5.tint : 0),
                  c.push(e && e.special6 ? e.special6.tint : 0),
                  c.push(e && e.special7 ? e.special7.tint : 0),
                  c.push(e && e.special8 ? e.special8.tint : 0);
                for (var l = 0, d = c; l < d.length; l++) {
                  var u = d[l];
                  r.WriteUInt8(u);
                }
                return r.ToArray();
              })(e.header.menu_appearance)
            )
            .WriteArray(
              (function (e) {
                var t = new a.BitWriter(3);
                return (
                  (t.length = 24),
                  t.WriteUInt8(e.Normal),
                  t.WriteUInt8(e.Nightmare),
                  t.WriteUInt8(e.Hell),
                  t.ToArray()
                );
              })(e.header.difficulty)
            )
            .WriteUInt32(e.header.map_id)
            .WriteArray(new Uint8Array([0, 0]))
            .WriteUInt16(e.header.dead_merc)
            .WriteUInt32(parseInt(e.header.merc_id, 16))
            .WriteUInt16(e.header.merc_name_id)
            .WriteUInt16(e.header.merc_type)
            .WriteUInt32(e.header.merc_experience),
          e.header.version > 97
            ? t
                .WriteArray(new Uint8Array(76))
                .WriteString(e.header.name, 16)
                .WriteArray(new Uint8Array(52))
            : t.WriteArray(new Uint8Array(140)).WriteUInt32(1),
          t
            .WriteString('Woo!', 4)
            .WriteArray(new Uint8Array([6, 0, 0, 0, 42, 1]))
            .WriteArray(c(e.header.quests_normal))
            .WriteArray(c(e.header.quests_nm))
            .WriteArray(c(e.header.quests_hell))
            .WriteString('WS', 2)
            .WriteArray(new Uint8Array([1, 0, 0, 0, 80, 0]))
            .WriteArray(
              (function (e) {
                var t = new a.BitWriter(72);
                t.length = 576;
                for (var r = 0; r < n.length; r++) {
                  var i = null != e ? e[n[r]] : null;
                  t.WriteArray(f(i));
                }
                return t.ToArray();
              })(e.header.waypoints)
            )
            .WriteArray(new Uint8Array([1, 119]))
            .WriteUInt16(52)
            .WriteArray(
              (function (e) {
                var t = new a.BitWriter(48);
                if (((t.length = 384), e)) {
                  for (var r = 0; r < 3; r++) {
                    var i = e[n[r]];
                    t.SeekByte(5 * r),
                      t.WriteBit(+i.warriv_act_ii.intro),
                      t.WriteBit(0),
                      t.WriteBit(+i.charsi.intro),
                      t.WriteBit(+i.warriv_act_i.intro),
                      t.WriteBit(+i.kashya.intro),
                      t.WriteBit(+i.akara.intro),
                      t.WriteBit(+i.gheed.intro),
                      t.WriteBit(0),
                      t.WriteBit(+i.greiz.intro),
                      t.WriteBit(+i.jerhyn.intro),
                      t.WriteBit(+i.meshif_act_ii.intro),
                      t.WriteBit(+i.geglash.intro),
                      t.WriteBit(+i.lysnader.intro),
                      t.WriteBit(+i.fara.intro),
                      t.WriteBit(+i.drogan.intro),
                      t.WriteBit(0),
                      t.WriteBit(+i.alkor.intro),
                      t.WriteBit(+i.hratli.intro),
                      t.WriteBit(+i.ashera.intro),
                      t.WriteBits(new Uint8Array(2).fill(0), 2),
                      t.WriteBit(+i.cain_act_iii.intro),
                      t.WriteBit(0),
                      t.WriteBit(+i.elzix.intro),
                      t.WriteBit(+i.malah.intro),
                      t.WriteBit(+i.anya.intro),
                      t.WriteBit(0),
                      t.WriteBit(+i.natalya.intro),
                      t.WriteBit(+i.meshif_act_iii.intro),
                      t.WriteBits(new Uint8Array(2).fill(0), 2),
                      t.WriteBit(+i.ormus.intro),
                      t.WriteBits(new Uint8Array(5).fill(0), 5),
                      t.WriteBit(+i.cain_act_v.intro),
                      t.WriteBit(+i.qualkehk.intro),
                      t.WriteBit(+i.nihlathak.intro);
                  }
                  for (r = 0; r < 3; r++) {
                    t.SeekByte(24 + 5 * r);
                    i = e[n[r]];
                    t.WriteBit(+i.warriv_act_ii.congrats),
                      t.WriteBit(0),
                      t.WriteBit(+i.charsi.congrats),
                      t.WriteBit(+i.warriv_act_i.congrats),
                      t.WriteBit(+i.kashya.congrats),
                      t.WriteBit(+i.akara.congrats),
                      t.WriteBit(+i.gheed.congrats),
                      t.WriteBit(0),
                      t.WriteBit(+i.greiz.congrats),
                      t.WriteBit(+i.jerhyn.congrats),
                      t.WriteBit(+i.meshif_act_ii.congrats),
                      t.WriteBit(+i.geglash.congrats),
                      t.WriteBit(+i.lysnader.congrats),
                      t.WriteBit(+i.fara.congrats),
                      t.WriteBit(+i.drogan.congrats),
                      t.WriteBit(0),
                      t.WriteBit(+i.alkor.congrats),
                      t.WriteBit(+i.hratli.congrats),
                      t.WriteBit(+i.ashera.congrats),
                      t.WriteBits(new Uint8Array(2).fill(0), 2),
                      t.WriteBit(+i.cain_act_iii.congrats),
                      t.WriteBit(0),
                      t.WriteBit(+i.elzix.congrats),
                      t.WriteBit(+i.malah.congrats),
                      t.WriteBit(+i.anya.congrats),
                      t.WriteBit(0),
                      t.WriteBit(+i.natalya.congrats),
                      t.WriteBit(+i.meshif_act_iii.congrats),
                      t.WriteBits(new Uint8Array(2).fill(0), 2),
                      t.WriteBit(+i.ormus.congrats),
                      t.WriteBits(new Uint8Array(5).fill(0), 5),
                      t.WriteBit(+i.cain_act_v.congrats),
                      t.WriteBit(+i.qualkehk.congrats),
                      t.WriteBit(+i.nihlathak.congrats);
                  }
                }
                return t.ToArray();
              })(e.header.npcs)
            );
      });
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__awaiter) ||
        function (e, t, r, i) {
          return new (r || (r = Promise))(function (a, n) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                n(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            i,
            a,
            n,
            s = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (n = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this;
              }),
            n
          );
          function o(n) {
            return function (o) {
              return (function (n) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (a =
                          2 & n[0]
                            ? i.return
                            : n[0]
                            ? i.throw || ((a = i.return) && a.call(i), 0)
                            : i.next) &&
                        !(a = a.call(i, n[1])).done)
                    )
                      return a;
                    switch (((i = 0), a && (n = [2 & n[0], a.value]), n[0])) {
                      case 0:
                      case 1:
                        a = n;
                        break;
                      case 4:
                        return s.label++, { value: n[1], done: !1 };
                      case 5:
                        s.label++, (i = n[1]), (n = [0]);
                        continue;
                      case 7:
                        (n = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== n[0] && 2 !== n[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === n[0] &&
                          (!a || (n[1] > a[0] && n[1] < a[3]))
                        ) {
                          s.label = n[1];
                          break;
                        }
                        if (6 === n[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = n);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(n);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    n = t.call(e, s);
                  } catch (e) {
                    (n = [6, e]), (i = 0);
                  } finally {
                    r = a = 0;
                  }
                if (5 & n[0]) throw n[1];
                return { value: n[0] ? n[1] : void 0, done: !0 };
              })([n, o]);
            };
          }
        };
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.writeAttributes = t.readAttributes = void 0);
    var n = r(0);
    (t.readAttributes = function (e, t, r) {
      return i(this, void 0, void 0, function () {
        var i, n, o, c;
        return a(this, function (a) {
          if (((e.attributes = {}), 'gf' != t.ReadString(2))) {
            if (1 === e.header.level)
              return (
                (i = r.classes.find(function (t) {
                  return t.n === e.header.class;
                }).a),
                (e.attributes = {
                  strength: +i.str,
                  energy: +i.int,
                  dexterity: +i.dex,
                  vitality: +i.vit,
                  unused_stats: 0,
                  unused_skill_points: 0,
                  current_hp: +i.vit + +i.hpadd,
                  max_hp: +i.vit + +i.hpadd,
                  current_mana: +i.int,
                  max_mana: +i.int,
                  current_stamina: +i.stam,
                  max_stamina: +i.stam,
                  level: 1,
                  experience: 0,
                  gold: 0,
                  stashed_gold: 0,
                }),
                [2]
              );
            throw new Error(
              "Attribute header 'gf' not found at position " + (t.offset - 16)
            );
          }
          for (0, n = t.ReadUInt16(9); 511 != n; ) {
            if ((9, void 0 === (o = r.magical_properties[n])))
              throw new Error('Invalid attribute id: ' + n);
            (c = o.cB),
              (e.attributes[s[o.s]] = t.ReadUInt32(c)),
              n >= 6 && n <= 11 && (e.attributes[s[o.s]] >>>= 8),
              c,
              (n = t.ReadUInt16(9));
          }
          return t.Align(), [2];
        });
      });
    }),
      (t.writeAttributes = function (e, t) {
        return i(this, void 0, void 0, function () {
          var r, i, o, c, l;
          return a(this, function (a) {
            for (
              (r = new n.BitWriter()).WriteString('gf', 2), i = 0;
              i < 16;
              i++
            ) {
              if (void 0 === (o = t.magical_properties[i]))
                throw new Error('Invalid attribute: ' + o);
              (c = e.attributes[s[o.s]]) &&
                ((l = o.cB),
                i >= 6 && i <= 11 && (c <<= 8),
                r.WriteUInt16(i, 9),
                r.WriteUInt32(c, l));
            }
            return r.WriteUInt16(511, 9), r.Align(), [2, r.ToArray()];
          });
        });
      });
    var s = {
      strength: 'strength',
      energy: 'energy',
      dexterity: 'dexterity',
      vitality: 'vitality',
      statpts: 'unused_stats',
      newskills: 'unused_skill_points',
      hitpoints: 'current_hp',
      maxhp: 'max_hp',
      mana: 'current_mana',
      maxmana: 'max_mana',
      stamina: 'current_stamina',
      maxstamina: 'max_stamina',
      level: 'level',
      experience: 'experience',
      gold: 'gold',
      goldbank: 'stashed_gold',
    };
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__awaiter) ||
        function (e, t, r, i) {
          return new (r || (r = Promise))(function (a, n) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                n(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            i,
            a,
            n,
            s = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (n = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this;
              }),
            n
          );
          function o(n) {
            return function (o) {
              return (function (n) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (a =
                          2 & n[0]
                            ? i.return
                            : n[0]
                            ? i.throw || ((a = i.return) && a.call(i), 0)
                            : i.next) &&
                        !(a = a.call(i, n[1])).done)
                    )
                      return a;
                    switch (((i = 0), a && (n = [2 & n[0], a.value]), n[0])) {
                      case 0:
                      case 1:
                        a = n;
                        break;
                      case 4:
                        return s.label++, { value: n[1], done: !1 };
                      case 5:
                        s.label++, (i = n[1]), (n = [0]);
                        continue;
                      case 7:
                        (n = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== n[0] && 2 !== n[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === n[0] &&
                          (!a || (n[1] > a[0] && n[1] < a[3]))
                        ) {
                          s.label = n[1];
                          break;
                        }
                        if (6 === n[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = n);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(n);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    n = t.call(e, s);
                  } catch (e) {
                    (n = [6, e]), (i = 0);
                  } finally {
                    r = a = 0;
                  }
                if (5 & n[0]) throw n[1];
                return { value: n[0] ? n[1] : void 0, done: !0 };
              })([n, o]);
            };
          }
        };
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.writeSkills = t.readSkills = void 0);
    var n = r(0);
    (t.readSkills = function (e, t, r) {
      return i(this, void 0, void 0, function () {
        var i, n, o;
        return a(this, function (a) {
          if (
            ((e.skills = []), (i = s[e.header.class]), 'if' !== t.ReadString(2))
          ) {
            if (1 === e.header.level) return [2];
            throw new Error(
              "Skills header 'if' not found at position " + (t.offset - 16)
            );
          }
          for (n = 0; n < 30; n++)
            (o = i + n),
              e.skills.push({
                id: o,
                points: t.ReadUInt8(),
                name: r.skills[o].s,
              });
          return [2];
        });
      });
    }),
      (t.writeSkills = function (e, t) {
        return i(this, void 0, void 0, function () {
          var t, r;
          return a(this, function (i) {
            for (
              (t = new n.BitWriter()).WriteString('if', 2), r = 0;
              r < 30;
              r++
            )
              t.WriteUInt8(e.skills[r].points);
            return [2, t.ToArray()];
          });
        });
      });
    var s = {
      Amazon: 6,
      Sorceress: 36,
      Necromancer: 66,
      Paladin: 96,
      Barbarian: 126,
      Druid: 221,
      Assassin: 251,
    };
  },
  function (e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.setConstantData = t.getConstantData = void 0);
    var i = new Map();
    (t.getConstantData = function (e) {
      if (!(e in i))
        throw new Error('No constant data found for this version ' + e);
      return i[e];
    }),
      (t.setConstantData = function (e, t) {
        i[e] = t;
      });
  },
  function (e, t, r) {
    'use strict';
    var i,
      a =
        (this && this.__assign) ||
        function () {
          return (a =
            Object.assign ||
            function (e) {
              for (var t, r = 1, i = arguments.length; r < i; r++)
                for (var a in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
      n =
        (this && this.__awaiter) ||
        function (e, t, r, i) {
          return new (r || (r = Promise))(function (a, n) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                n(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      s =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            i,
            a,
            n,
            s = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (n = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this;
              }),
            n
          );
          function o(n) {
            return function (o) {
              return (function (n) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (a =
                          2 & n[0]
                            ? i.return
                            : n[0]
                            ? i.throw || ((a = i.return) && a.call(i), 0)
                            : i.next) &&
                        !(a = a.call(i, n[1])).done)
                    )
                      return a;
                    switch (((i = 0), a && (n = [2 & n[0], a.value]), n[0])) {
                      case 0:
                      case 1:
                        a = n;
                        break;
                      case 4:
                        return s.label++, { value: n[1], done: !1 };
                      case 5:
                        s.label++, (i = n[1]), (n = [0]);
                        continue;
                      case 7:
                        (n = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== n[0] && 2 !== n[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === n[0] &&
                          (!a || (n[1] > a[0] && n[1] < a[3]))
                        ) {
                          s.label = n[1];
                          break;
                        }
                        if (6 === n[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = n);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(n);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    n = t.call(e, s);
                  } catch (e) {
                    (n = [6, e]), (i = 0);
                  } finally {
                    r = a = 0;
                  }
                if (5 & n[0]) throw n[1];
                return { value: n[0] ? n[1] : void 0, done: !0 };
              })([n, o]);
            };
          }
        },
      o =
        (this && this.__spreadArrays) ||
        function () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length;
          var i = Array(e),
            a = 0;
          for (t = 0; t < r; t++)
            for (var n = arguments[t], s = 0, o = n.length; s < o; s++, a++)
              i[a] = n[s];
          return i;
        };
    function c(e, t, r) {
      return n(this, void 0, void 0, function () {
        var i;
        return s(this, function (a) {
          return (
            (i = e.items.filter(function (e) {
              return (
                1 === e.location_id &&
                13 !== e.equipped_id &&
                14 !== e.equipped_id
              );
            })),
            (e.item_bonuses = [].concat
              .apply(
                [],
                i.map(function (e) {
                  return h(e, t);
                })
              )
              .filter(function (e) {
                return null != e;
              })),
            (e.item_bonuses = p(e.item_bonuses, t)),
            u(e.item_bonuses, t, e.attributes.level, r),
            [2]
          );
        });
      });
    }
    function l(e, t, r, i, a) {
      return (
        void 0 === r && (r = 1),
        n(this, void 0, void 0, function () {
          var n, o, c;
          return s(this, function (s) {
            if (!e) return [2];
            for (n = 0, o = e; n < o.length; n++)
              (c = o[n]) &&
                (c.socketed_items &&
                  c.socketed_items.length &&
                  l(c.socketed_items, t, r, i, c),
                d(c, t, r, i, a));
            return [2];
          });
        })
      );
    }
    function d(e, t, r, a, n) {
      var s, o, c, l;
      if ((void 0 === r && (r = 1), n)) {
        var d =
            t.armor_items[n.type] ||
            t.weapon_items[n.type] ||
            t.other_items[e.type],
          f = t.other_items[e.type];
        f.m &&
          (e.magic_attributes = (function (e, t) {
            for (var r = [], i = 0, a = e; i < a.length; i++)
              for (
                var n = a[i], s = t.properties[n.m] || [], o = 0;
                o < s.length;
                o++
              ) {
                var c = s[o],
                  l = c.s;
                switch (c.f) {
                  case 5:
                    l = 'mindamage';
                    break;
                  case 6:
                    l = 'maxdamage';
                    break;
                  case 7:
                    l = 'item_maxdamage_percent';
                    break;
                  case 20:
                    l = 'item_indesctructible';
                }
                var d = _(l, t),
                  u = t.magical_properties[d];
                u.np && (o += u.np);
                var f = [n.min, n.max];
                n.p && f.push(n.p), r.push({ id: d, values: f, name: u.s });
              }
            return r;
          })(f.m[d.gt], t));
      }
      var v = null;
      if (t.armor_items[e.type])
        (v = t.armor_items[e.type]),
          (e.type_id = i.Armor),
          v.maxac &&
            (0 == e.ethereal
              ? (e.defense_rating = v.maxac)
              : 1 == e.ethereal &&
                (e.defense_rating = Math.floor(1.5 * v.maxac)));
      else if (t.weapon_items[e.type]) {
        (v = t.weapon_items[e.type]), (e.type_id = i.Weapon);
        var m = {};
        0 == e.ethereal
          ? (v.mind && (m.mindam = v.mind),
            v.maxd && (m.maxdam = v.maxd),
            v.min2d && (m.twohandmindam = v.min2d),
            v.max2d && (m.twohandmaxdam = v.max2d))
          : 1 == e.ethereal &&
            (v.mind && (m.mindam = Math.floor(1.5 * v.mind)),
            v.maxd && (m.maxdam = Math.floor(1.5 * v.maxd)),
            v.min2d && (m.twohandmindam = Math.floor(1.5 * v.min2d)),
            v.max2d && (m.twohandmaxdam = Math.floor(1.5 * v.max2d))),
          (e.base_damage = m);
      } else
        t.other_items[e.type] &&
          ((e.type_id = i.Other), (v = t.other_items[e.type]));
      if (v)
        if (
          (v.n && (e.type_name = v.n),
          v.rs && (e.reqstr = v.rs),
          v.rd && (e.reqdex = v.rd),
          v.i && (e.inv_file = v.i),
          v.ih && (e.inv_height = v.ih),
          v.iw && (e.inv_width = v.iw),
          v.it && (e.inv_transform = v.it),
          v.iq && (e.item_quality = v.iq),
          v.c && (e.categories = v.c),
          v.durability &&
            (0 == e.ethereal
              ? ((e.current_durability = v.durability),
                (e.max_durability = v.durability))
              : 1 == e.ethereal &&
                ((e.current_durability =
                  v.durability - Math.ceil(v.durability / 2) + 1),
                (e.max_durability =
                  v.durability - Math.ceil(v.durability / 2) + 1))),
          e.multiple_pictures && (e.inv_file = v.ig[e.picture_id]),
          e.magic_prefix || e.magic_suffix)
        )
          e.magic_prefix &&
            (null === (s = t.magic_prefixes[e.magic_prefix]) || void 0 === s
              ? void 0
              : s.tc) &&
            (e.transform_color = t.magic_prefixes[e.magic_prefix].tc),
            e.magic_suffix &&
              (null === (o = t.magic_suffixes[e.magic_suffix]) || void 0 === o
                ? void 0
                : o.tc) &&
              (e.transform_color = t.magic_suffixes[e.magic_suffix].tc);
        else if (e.magical_name_ids && 6 === e.magical_name_ids.length)
          for (var g = 0; g < 6; g++) {
            var y = e.magical_name_ids[g];
            y &&
              (g % 2 == 0 &&
              t.magic_prefixes[y] &&
              (null === (c = t.magic_prefixes[y]) || void 0 === c
                ? void 0
                : c.tc)
                ? (e.transform_color = t.magic_prefixes[y].tc)
                : t.magic_suffixes[y] &&
                  (null === (l = t.magic_suffixes[y]) || void 0 === l
                    ? void 0
                    : l.tc) &&
                  (e.transform_color = t.magic_suffixes[y].tc));
          }
        else if (e.unique_id) {
          var b = t.unq_items[e.unique_id];
          v.ui && (e.inv_file = v.ui),
            b && b.i && (e.inv_file = b.i),
            b && b.tc && (e.transform_color = b.tc);
        } else if (e.set_id) {
          var w = t.set_items[e.set_id];
          v.ui && (e.inv_file = v.ui),
            w && w.i && (e.inv_file = w.i),
            w && w.tc && (e.transform_color = w.tc);
        }
      (e.magic_attributes || e.runeword_attributes || e.socketed_items) &&
        ((e.displayed_magic_attributes = u(e.magic_attributes, t, r, a)),
        (e.displayed_runeword_attributes = u(e.runeword_attributes, t, r, a)),
        (e.combined_magic_attributes = p(h(e, t), t)),
        (e.displayed_combined_magic_attributes = u(
          e.combined_magic_attributes,
          t,
          r,
          a
        )));
    }
    function u(e, t, r, i) {
      if ((void 0 === r && (r = 1), !e)) return [];
      for (
        var n = o(
            e.map(function (e) {
              return a({}, e);
            })
          ),
          s = [0, 0, 0],
          c = [0, 0, 0],
          l = 0,
          d = n;
        l < d.length;
        l++
      ) {
        var u = d[l],
          _ = t.magical_properties[u.id],
          h = u.values[u.values.length - 1];
        _.dg &&
          (0 === c[_.dg - 1] && (c[_.dg - 1] = h),
          c[_.dg - 1] - h == 0 && s[_.dg - 1]++);
      }
      for (
        var p = function (e) {
            var i = t.magical_properties[e.id];
            if (null == i)
              throw new Error('Cannot find Magical Property for id: ' + e.id);
            var a = e.values[e.values.length - 1];
            if ('level' === i.ob) {
              switch (i.o) {
                case 1:
                  a = Math.floor((r * a) / 100);
                  break;
                case 2:
                case 3:
                case 4:
                case 5:
                  a = Math.floor((r * a) / Math.pow(2, i.op));
              }
              (e.op_stats = i.os), (e.op_value = a);
            }
            var n = i.dF,
              o = a >= 0 ? i.dP : i.dN;
            (39 != e.id && 41 != e.id && 43 != e.id && 45 != e.id) ||
              (o = i.dP);
            var l = i.dV,
              d = i.d2;
            if (
              (i.dg &&
                4 === s[i.dg - 1] &&
                ((o = (a = c[i.dg - 1]) >= 0 ? i.dgP : i.dgN ? i.dgN : i.dgP),
                (l = i.dgV),
                (n = i.dgF),
                (d = i.dg2)),
              i.np)
            ) {
              var u = 0;
              if (((o = i.dR), 'poisonmindam' === i.s)) {
                var _ = Math.floor((e.values[0] * e.values[2]) / 256),
                  h = Math.floor((e.values[1] * e.values[2]) / 256),
                  p = Math.floor(e.values[2] / 25);
                e.values = [_, h, p];
              }
              e.values[0] === e.values[1] &&
                (u++,
                (o = i.dE),
                'item_maxdamage_percent' === i.s &&
                  (o =
                    '+%d% ' + o.replace(/}/gi, '').replace(/%\+?d%%/gi, ''))),
                (e.description = o.replace(/%d/gi, function () {
                  return e.values[u++];
                }));
            } else
              !(function (e, t, r, i, a, n, s) {
                if (!i) return;
                var o = r >= 0 ? '+' : '',
                  c = null,
                  l = i >= 6 && i <= 10;
                switch (i) {
                  case 1:
                  case 6:
                  case 12:
                    c = '' + o + r;
                    break;
                  case 2:
                  case 7:
                    c = r + '%';
                    break;
                  case 3:
                  case 9:
                    c = '' + r;
                    break;
                  case 4:
                  case 8:
                    c = '' + o + r + '%';
                    break;
                  case 5:
                  case 10:
                    c =
                      n.indexOf('%%') < 0
                        ? (100 * r) / 128 + '%'
                        : (100 * r) / 128;
                    break;
                  case 11:
                    e.description = n.replace(/%d/, (r / 100).toString());
                    break;
                  case 13:
                    var d = t.classes[e.values[0]];
                    e.description = '' + o + r + ' ' + d.as;
                    break;
                  case 14:
                    var u = (d = t.classes[e.values[1]]).ts[e.values[0]];
                    (n = f(u, r)), (e.description = n + ' ' + d.co);
                    break;
                  case 15:
                    (n = f(
                      n,
                      e.values[2],
                      e.values[0],
                      t.skills[e.values[1]].s
                    )),
                      (e.description = '' + n);
                    break;
                  case 16:
                    (e.description = n.replace(/%d/, r.toString())),
                      (e.description = e.description.replace(
                        /%s/,
                        t.skills[e.values[0]].s
                      ));
                    break;
                  case 17:
                    e.description = r + ' ' + n + ' (Increases near [time])';
                    break;
                  case 18:
                    e.description = r + '% ' + n + ' (Increases near [time])';
                    break;
                  case 19:
                    e.description = f(n, r.toString());
                    break;
                  case 20:
                    c = -1 * r + '%';
                    break;
                  case 21:
                    c = '' + -1 * r;
                    break;
                  case 22:
                    e.description = r + '% ' + n + ' [montype]';
                    break;
                  case 23:
                    e.description = r + '% ' + n + ' [monster]]';
                    break;
                  case 24:
                    if (0 == n.indexOf('(')) {
                      var _ = 0;
                      (n = n.replace(/%d/gi, function () {
                        return e.values[2 + _++].toString();
                      })),
                        (e.description =
                          'Level ' +
                          e.values[0] +
                          ' ' +
                          t.skills[e.values[1]].s +
                          ' ' +
                          n);
                    } else
                      e.description = f(
                        n,
                        e.values[0],
                        t.skills[e.values[1]].s,
                        e.values[2],
                        e.values[3]
                      );
                    break;
                  case 27:
                    d = (function (e, t) {
                      return t.classes.filter(function (t) {
                        return t.c === e;
                      })[0];
                    })((h = t.skills[e.values[0]]).c, t);
                    e.description = n
                      ? f(
                          n,
                          r,
                          null == h ? void 0 : h.s,
                          null == d ? void 0 : d.co
                        )
                      : '' +
                        o +
                        r +
                        ' to ' +
                        (null == h ? void 0 : h.s) +
                        ' ' +
                        (null == d ? void 0 : d.co);
                    break;
                  case 28:
                    var h = t.skills[e.values[0]];
                    e.description =
                      '' + o + r + ' to ' + (null == h ? void 0 : h.s);
                    break;
                  case 29:
                    e.description = f(n, r.toString());
                    break;
                  default:
                    throw new Error('No handler for descFunc: ' + i);
                }
                if (c)
                  switch ((a = a || 0)) {
                    case 0:
                      e.description = f(n, c);
                      break;
                    case 1:
                      e.description = c + ' ' + n;
                      break;
                    case 2:
                      e.description = n + ' ' + c;
                      break;
                    default:
                      throw new Error('No handler for descVal: ' + a);
                  }
                l && (e.description += ' ' + s);
              })(e, t, a, n, l, o, d);
          },
          v = 0,
          m = n;
        v < m.length;
        v++
      ) {
        p((u = m[v]));
      }
      (null == i ? void 0 : i.sortProperties) &&
        n.sort(function (e, r) {
          return t.magical_properties[r.id].so - t.magical_properties[e.id].so;
        });
      for (var g = n.length - 1; g >= 1; g--)
        for (var y = g - 1; y >= 0; y--)
          n[g].description === n[y].description && (n[y].visible = !1);
      return n;
    }
    function f(e) {
      for (var t = [], r = 1; r < arguments.length; r++)
        t[r - 1] = arguments[r];
      var i = 0;
      return e
        .replace(/%\+?d|%\+?s/gi, function (e) {
          var r = t[i++].toString();
          return e.indexOf('+') >= 0 && (r = '+' + r), r;
        })
        .replace('%%', '%');
    }
    function _(e, t) {
      return t.magical_properties.findIndex(function (t) {
        return t.s === e;
      });
    }
    function h(e, t) {
      var r = [];
      if (e.socketed_items)
        for (var i = 0, a = e.socketed_items; i < a.length; i++) {
          var n = a[i];
          n.magic_attributes &&
            (r = r.concat.apply(
              r,
              JSON.parse(JSON.stringify(n.magic_attributes))
            ));
        }
      var s = e.magic_attributes || [],
        c = e.runeword_attributes || [];
      return o(
        [],
        JSON.parse(JSON.stringify(s)),
        JSON.parse(JSON.stringify(c)),
        JSON.parse(JSON.stringify(r))
      ).filter(function (e) {
        return null != e;
      });
    }
    function p(e, t) {
      for (
        var r = [],
          i = function (e) {
            var i = t.magical_properties[e.id],
              a = r.filter(function (t) {
                return 3 === i.e
                  ? t.id === e.id &&
                      t.values[0] === e.values[0] &&
                      t.values[1] === e.values[1]
                  : 15 === i.dF
                  ? t.id === e.id &&
                    t.values[0] === e.values[0] &&
                    t.values[1] === e.values[1] &&
                    t.values[2] === e.values[2]
                  : 16 === i.dF ||
                    23 === i.dF ||
                    'state' === i.s ||
                    'item_nonclassskill' === i.s
                  ? t.id === e.id &&
                    t.values[0] === e.values[0] &&
                    t.values[1] === e.values[1]
                  : t.id === e.id;
              });
            if (a && a.length)
              for (var n = 0; n < a.length; n++) {
                var s = a[n];
                if (i.np) {
                  (s.values[0] += e.values[0]), (s.values[1] += e.values[1]);
                  break;
                }
                for (
                  var o = !0, c = 3 === i.e ? 2 : 1, l = 0;
                  l < s.values.length - c && (o = s.values[l] === e.values[l]);
                  l++
                );
                if (o)
                  for (l = 1; l <= c; l++) {
                    var d = s.values.length - l;
                    s.values[d] += e.values[d];
                  }
                else r.push({ id: e.id, values: e.values, name: e.name });
              }
            else r.push({ id: e.id, values: e.values, name: e.name });
          },
          a = 0,
          n = e;
        a < n.length;
        a++
      ) {
        i(n[a]);
      }
      return r;
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.enhanceItem =
        t.enhanceItems =
        t.enhancePlayerAttributes =
        t.enhanceAttributes =
          void 0),
      (function (e) {
        (e[(e.Armor = 1)] = 'Armor'),
          (e[(e.Shield = 2)] = 'Shield'),
          (e[(e.Weapon = 3)] = 'Weapon'),
          (e[(e.Other = 4)] = 'Other');
      })(i || (i = {})),
      (t.enhanceAttributes = function (e, t, r) {
        return n(this, void 0, void 0, function () {
          return s(this, function (i) {
            return (
              l(e.items, t, e.attributes.level, r),
              l([e.golem_item], t, e.attributes.level, r),
              l(e.merc_items, t, e.attributes.level, r),
              l(e.corpse_items, t, e.attributes.level, r),
              c(e, t, r),
              [2]
            );
          });
        });
      }),
      (t.enhancePlayerAttributes = c),
      (t.enhanceItems = l),
      (t.enhanceItem = d);
  },
  function (e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.EItemQuality = t.EStashType = void 0),
      (function (e) {
        (e[(e.shared = 0)] = 'shared'), (e[(e.private = 1)] = 'private');
      })(t.EStashType || (t.EStashType = {})),
      (function (e) {
        (e[(e.normal = 0)] = 'normal'),
          (e[(e.exceptional = 1)] = 'exceptional'),
          (e[(e.elite = 2)] = 'elite');
      })(t.EItemQuality || (t.EItemQuality = {}));
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, i) {
              void 0 === i && (i = r),
                Object.defineProperty(e, i, {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                });
            }
          : function (e, t, r, i) {
              void 0 === i && (i = r), (e[i] = t[r]);
            }),
      a =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
            }
          : function (e, t) {
              e.default = t;
            }),
      n =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e) 'default' === r || t.hasOwnProperty(r) || i(t, e, r);
        },
      s =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              'default' !== r && Object.hasOwnProperty.call(e, r) && i(t, e, r);
          return a(t, e), t;
        };
    Object.defineProperty(t, '__esModule', { value: !0 }), n(r(10), t);
    var o = r(2);
    Object.defineProperty(t, 'readHeader', {
      enumerable: !0,
      get: function () {
        return o.readHeader;
      },
    }),
      Object.defineProperty(t, 'readHeaderData', {
        enumerable: !0,
        get: function () {
          return o.readHeaderData;
        },
      }),
      Object.defineProperty(t, 'writeHeader', {
        enumerable: !0,
        get: function () {
          return o.writeHeader;
        },
      }),
      Object.defineProperty(t, 'writeHeaderData', {
        enumerable: !0,
        get: function () {
          return o.writeHeaderData;
        },
      }),
      Object.defineProperty(t, 'fixHeader', {
        enumerable: !0,
        get: function () {
          return o.fixHeader;
        },
      });
    var c = r(4);
    Object.defineProperty(t, 'readAttributes', {
      enumerable: !0,
      get: function () {
        return c.readAttributes;
      },
    }),
      Object.defineProperty(t, 'writeAttributes', {
        enumerable: !0,
        get: function () {
          return c.writeAttributes;
        },
      });
    var l = r(5);
    Object.defineProperty(t, 'readSkills', {
      enumerable: !0,
      get: function () {
        return l.readSkills;
      },
    }),
      Object.defineProperty(t, 'writeSkills', {
        enumerable: !0,
        get: function () {
          return l.writeSkills;
        },
      });
    var d = r(7);
    Object.defineProperty(t, 'enhanceAttributes', {
      enumerable: !0,
      get: function () {
        return d.enhanceAttributes;
      },
    }),
      Object.defineProperty(t, 'enhanceItems', {
        enumerable: !0,
        get: function () {
          return d.enhanceItems;
        },
      }),
      Object.defineProperty(t, 'enhancePlayerAttributes', {
        enumerable: !0,
        get: function () {
          return d.enhancePlayerAttributes;
        },
      });
    var u = r(6);
    Object.defineProperty(t, 'getConstantData', {
      enumerable: !0,
      get: function () {
        return u.getConstantData;
      },
    }),
      Object.defineProperty(t, 'setConstantData', {
        enumerable: !0,
        get: function () {
          return u.setConstantData;
        },
      }),
      n(r(12), t),
      (t.types = s(r(8)));
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, i) {
              void 0 === i && (i = r),
                Object.defineProperty(e, i, {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                });
            }
          : function (e, t, r, i) {
              void 0 === i && (i = r), (e[i] = t[r]);
            }),
      a =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
            }
          : function (e, t) {
              e.default = t;
            }),
      n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              'default' !== r && Object.hasOwnProperty.call(e, r) && i(t, e, r);
          return a(t, e), t;
        },
      s =
        (this && this.__awaiter) ||
        function (e, t, r, i) {
          return new (r || (r = Promise))(function (a, n) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                n(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      o =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            i,
            a,
            n,
            s = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (n = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this;
              }),
            n
          );
          function o(n) {
            return function (o) {
              return (function (n) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (a =
                          2 & n[0]
                            ? i.return
                            : n[0]
                            ? i.throw || ((a = i.return) && a.call(i), 0)
                            : i.next) &&
                        !(a = a.call(i, n[1])).done)
                    )
                      return a;
                    switch (((i = 0), a && (n = [2 & n[0], a.value]), n[0])) {
                      case 0:
                      case 1:
                        a = n;
                        break;
                      case 4:
                        return s.label++, { value: n[1], done: !1 };
                      case 5:
                        s.label++, (i = n[1]), (n = [0]);
                        continue;
                      case 7:
                        (n = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== n[0] && 2 !== n[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === n[0] &&
                          (!a || (n[1] > a[0] && n[1] < a[3]))
                        ) {
                          s.label = n[1];
                          break;
                        }
                        if (6 === n[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = n);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(n);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    n = t.call(e, s);
                  } catch (e) {
                    (n = [6, e]), (i = 0);
                  } finally {
                    r = a = 0;
                  }
                if (5 & n[0]) throw n[1];
                return { value: n[0] ? n[1] : void 0, done: !0 };
              })([n, o]);
            };
          }
        };
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.writeItem =
        t.readItem =
        t.write =
        t.read =
        t.writer =
        t.reader =
          void 0);
    var c = r(2),
      l = r(4),
      d = r(1),
      u = r(0),
      f = r(5),
      _ = n(r(11)),
      h = r(6),
      p = r(7),
      v = { extendedStash: !1, sortProperties: !0 };
    (t.reader = function (e) {
      return new d.BitReader(e);
    }),
      (t.read = function (e, t, r) {
        return s(this, void 0, void 0, function () {
          var i, a, n;
          return o(this, function (s) {
            switch (s.label) {
              case 0:
                return (
                  (i = {}),
                  (a = new d.BitReader(e)),
                  (n = Object.assign(v, r)),
                  [4, c.readHeader(i, a)]
                );
              case 1:
                return (
                  s.sent(),
                  t || (t = h.getConstantData(i.header.version)),
                  [4, c.readHeaderData(i, a, t)]
                );
              case 2:
                return s.sent(), [4, l.readAttributes(i, a, t)];
              case 3:
                return s.sent(), [4, f.readSkills(i, a, t)];
              case 4:
                return s.sent(), [4, _.readCharItems(i, a, t, n)];
              case 5:
                return s.sent(), [4, _.readCorpseItems(i, a, t, n)];
              case 6:
                return (
                  s.sent(),
                  i.header.status.expansion
                    ? [4, _.readMercItems(i, a, t, n)]
                    : [3, 9]
                );
              case 7:
                return s.sent(), [4, _.readGolemItems(i, a, t, n)];
              case 8:
                s.sent(), (s.label = 9);
              case 9:
                return [4, p.enhanceAttributes(i, t, n)];
              case 10:
                return s.sent(), [2, i];
            }
          });
        });
      }),
      (t.readItem = function (e, t, r, i) {
        return s(this, void 0, void 0, function () {
          var a, n, s;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (a = new d.BitReader(e)),
                  (n = Object.assign(v, i)),
                  r || (r = h.getConstantData(t)),
                  [4, _.readItem(a, t, r, n)]
                );
              case 1:
                return (s = o.sent()), [4, p.enhanceItems([s], r)];
              case 2:
                return o.sent(), [2, s];
            }
          });
        });
      }),
      (t.writer = function (e) {
        return new u.BitWriter();
      }),
      (t.write = function (e, t, r) {
        return s(this, void 0, void 0, function () {
          var i, a, n, s, d, p, m, g, y, b, w, W, B, x, k, I, A, R;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (i = Object.assign(v, r)),
                  (a = new u.BitWriter()),
                  (s = (n = a).WriteArray),
                  [4, c.writeHeader(e)]
                );
              case 1:
                return (
                  s.apply(n, [o.sent()]),
                  t || (t = h.getConstantData(e.header.version)),
                  (p = (d = a).WriteArray),
                  [4, c.writeHeaderData(e, t)]
                );
              case 2:
                return (
                  p.apply(d, [o.sent()]),
                  (g = (m = a).WriteArray),
                  [4, l.writeAttributes(e, t)]
                );
              case 3:
                return (
                  g.apply(m, [o.sent()]),
                  (b = (y = a).WriteArray),
                  [4, f.writeSkills(e, t)]
                );
              case 4:
                return (
                  b.apply(y, [o.sent()]),
                  (W = (w = a).WriteArray),
                  [4, _.writeCharItems(e, t, i)]
                );
              case 5:
                return (
                  W.apply(w, [o.sent()]),
                  (x = (B = a).WriteArray),
                  [4, _.writeCorpseItem(e, t, i)]
                );
              case 6:
                return (
                  x.apply(B, [o.sent()]),
                  e.header.status.expansion
                    ? ((I = (k = a).WriteArray), [4, _.writeMercItems(e, t, i)])
                    : [3, 9]
                );
              case 7:
                return (
                  I.apply(k, [o.sent()]),
                  (R = (A = a).WriteArray),
                  [4, _.writeGolemItems(e, t, i)]
                );
              case 8:
                R.apply(A, [o.sent()]), (o.label = 9);
              case 9:
                return [4, c.fixHeader(a)];
              case 10:
                return o.sent(), [2, a.ToArray()];
            }
          });
        });
      }),
      (t.writeItem = function (e, t, r, i) {
        return s(this, void 0, void 0, function () {
          var a, n, s, c;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (a = Object.assign(v, i)),
                  (n = new u.BitWriter()),
                  r || (r = h.getConstantData(t)),
                  (c = (s = n).WriteArray),
                  [4, _.writeItem(e, t, r, a)]
                );
              case 1:
                return c.apply(s, [o.sent()]), [2, n.ToArray()];
            }
          });
        });
      });
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__awaiter) ||
        function (e, t, r, i) {
          return new (r || (r = Promise))(function (a, n) {
            function s(e) {
              try {
                c(i.next(e));
              } catch (e) {
                n(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            i,
            a,
            n,
            s = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (n = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this;
              }),
            n
          );
          function o(n) {
            return function (o) {
              return (function (n) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (a =
                          2 & n[0]
                            ? i.return
                            : n[0]
                            ? i.throw || ((a = i.return) && a.call(i), 0)
                            : i.next) &&
                        !(a = a.call(i, n[1])).done)
                    )
                      return a;
                    switch (((i = 0), a && (n = [2 & n[0], a.value]), n[0])) {
                      case 0:
                      case 1:
                        a = n;
                        break;
                      case 4:
                        return s.label++, { value: n[1], done: !1 };
                      case 5:
                        s.label++, (i = n[1]), (n = [0]);
                        continue;
                      case 7:
                        (n = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== n[0] && 2 !== n[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === n[0] &&
                          (!a || (n[1] > a[0] && n[1] < a[3]))
                        ) {
                          s.label = n[1];
                          break;
                        }
                        if (6 === n[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = n);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(n);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    n = t.call(e, s);
                  } catch (e) {
                    (n = [6, e]), (i = 0);
                  } finally {
                    r = a = 0;
                  }
                if (5 & n[0]) throw n[1];
                return { value: n[0] ? n[1] : void 0, done: !0 };
              })([n, o]);
            };
          }
        };
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t._writeMagicProperties =
        t._readMagicProperties =
        t.writeItem =
        t.readItem =
        t.writeItems =
        t.readItems =
        t.writeCorpseItem =
        t.readCorpseItems =
        t.writeGolemItems =
        t.readGolemItems =
        t.writeMercItems =
        t.readMercItems =
        t.writeCharItems =
        t.readCharItems =
          void 0);
    var n,
      s,
      o = r(1),
      c = r(0);
    !(function (e) {
      (e[(e.Armor = 1)] = 'Armor'),
        (e[(e.Shield = 2)] = 'Shield'),
        (e[(e.Weapon = 3)] = 'Weapon'),
        (e[(e.Other = 4)] = 'Other');
    })(n || (n = {})),
      (function (e) {
        (e[(e.Low = 1)] = 'Low'),
          (e[(e.Normal = 2)] = 'Normal'),
          (e[(e.Superior = 3)] = 'Superior'),
          (e[(e.Magic = 4)] = 'Magic'),
          (e[(e.Set = 5)] = 'Set'),
          (e[(e.Rare = 6)] = 'Rare'),
          (e[(e.Unique = 7)] = 'Unique'),
          (e[(e.Crafted = 8)] = 'Crafted');
      })(s || (s = {}));
    var l = [
        [
          [
            [
              ['w', 'u'],
              [['8', ['y', ['5', ['j', []]]]], 'h'],
            ],
            ['s', [['2', 'n'], 'x']],
          ],
          [
            [['c', ['k', 'f']], 'b'],
            [
              ['t', 'm'],
              ['9', '7'],
            ],
          ],
        ],
        [
          ' ',
          [
            [
              [['e', 'd'], 'p'],
              [
                'g',
                [
                  [['z', 'q'], '3'],
                  ['v', '6'],
                ],
              ],
            ],
            [
              ['r', 'l'],
              [
                'a',
                [
                  ['1', ['4', '0']],
                  ['i', 'o'],
                ],
              ],
            ],
          ],
        ],
      ],
      d = {
        0: { v: 223, l: 8 },
        1: { v: 31, l: 7 },
        2: { v: 12, l: 6 },
        3: { v: 91, l: 7 },
        4: { v: 95, l: 8 },
        5: { v: 104, l: 8 },
        6: { v: 123, l: 7 },
        7: { v: 30, l: 5 },
        8: { v: 8, l: 6 },
        9: { v: 14, l: 5 },
        ' ': { v: 1, l: 2 },
        a: { v: 15, l: 5 },
        b: { v: 10, l: 4 },
        c: { v: 2, l: 5 },
        d: { v: 35, l: 6 },
        e: { v: 3, l: 6 },
        f: { v: 50, l: 6 },
        g: { v: 11, l: 5 },
        h: { v: 24, l: 5 },
        i: { v: 63, l: 7 },
        j: { v: 232, l: 9 },
        k: { v: 18, l: 6 },
        l: { v: 23, l: 5 },
        m: { v: 22, l: 5 },
        n: { v: 44, l: 6 },
        o: { v: 127, l: 7 },
        p: { v: 19, l: 5 },
        q: { v: 155, l: 8 },
        r: { v: 7, l: 5 },
        s: { v: 4, l: 4 },
        t: { v: 6, l: 5 },
        u: { v: 16, l: 5 },
        v: { v: 59, l: 7 },
        w: { v: 0, l: 5 },
        x: { v: 28, l: 5 },
        y: { v: 40, l: 7 },
        z: { v: 27, l: 8 },
      };
    function u(e, t, r, n, s) {
      return i(this, void 0, void 0, function () {
        var i, o, c, l, d;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              if (((i = []), 'JM' !== e.ReadString(2))) {
                if (1 === (null == s ? void 0 : s.header.level)) return [2, []];
                throw new Error(
                  "Item list header 'JM' not found at position " +
                    (e.offset - 16)
                );
              }
              (o = e.ReadUInt16()), (c = 0), (a.label = 1);
            case 1:
              return c < o ? ((d = (l = i).push), [4, _(e, t, r, n)]) : [3, 4];
            case 2:
              d.apply(l, [a.sent()]), (a.label = 3);
            case 3:
              return c++, [3, 1];
            case 4:
              return [2, i];
          }
        });
      });
    }
    function f(e, t, r, n) {
      return i(this, void 0, void 0, function () {
        var i, s, o, l;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              (i = new c.BitWriter()).WriteString('JM', 2),
                i.WriteUInt16(e.length),
                (s = 0),
                (a.label = 1);
            case 1:
              return s < e.length
                ? ((l = (o = i).WriteArray), [4, h(e[s], t, r, n)])
                : [3, 4];
            case 2:
              l.apply(o, [a.sent()]), (a.label = 3);
            case 3:
              return s++, [3, 1];
            case 4:
              return [2, i.ToArray()];
          }
        });
      });
    }
    function _(e, t, r, c, d) {
      return i(this, void 0, void 0, function () {
        var i, d, u, f, h, p, m, y, b;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              if (t <= 96 && 'JM' !== e.ReadString(2))
                throw new Error(
                  "Item header 'JM' not found at position " + (e.offset - 16)
                );
              if (
                ((function (e, t, r, i, a) {
                  var s;
                  (e._unknown_data = {}),
                    (e._unknown_data.b0_3 = t.ReadBitArray(4)),
                    (e.identified = t.ReadBit()),
                    (e._unknown_data.b5_10 = t.ReadBitArray(6)),
                    (e.socketed = t.ReadBit()),
                    (e._unknown_data.b12 = t.ReadBitArray(1)),
                    (e.new = t.ReadBit()),
                    (e._unknown_data.b14_15 = t.ReadBitArray(2)),
                    (e.is_ear = t.ReadBit()),
                    (e.starter_item = t.ReadBit()),
                    (e._unknown_data.b18_20 = t.ReadBitArray(3)),
                    (e.simple_item = t.ReadBit()),
                    (e.ethereal = t.ReadBit()),
                    (e._unknown_data.b23 = t.ReadBitArray(1)),
                    (e.personalized = t.ReadBit()),
                    (e._unknown_data.b25 = t.ReadBitArray(1)),
                    (e.given_runeword = t.ReadBit()),
                    (e._unknown_data.b27_31 = t.ReadBitArray(5)),
                    r <= 96
                      ? (e.version = t.ReadUInt16(10).toString(10))
                      : r >= 97 && (e.version = t.ReadUInt16(3).toString(2));
                  if (
                    ((e.location_id = t.ReadUInt8(3)),
                    (e.equipped_id = t.ReadUInt8(4)),
                    (e.position_x = t.ReadUInt8(4)),
                    (e.position_y = t.ReadUInt8(4)),
                    (e.alt_position_id = t.ReadUInt8(3)),
                    e.is_ear)
                  ) {
                    for (
                      var c = t.ReadUInt8(3),
                        d = t.ReadUInt8(7),
                        u = new Uint8Array(15),
                        f = 0;
                      f < u.length && ((u[f] = t.ReadUInt8(7)), 0 !== u[f]);
                      f++
                    );
                    var _ = new o.BitReader(u)
                      .ReadString(15)
                      .trim()
                      .replace(/\0/g, '');
                    e.ear_attributes = { class: c, level: d, name: _ };
                  } else {
                    if (r <= 96) e.type = t.ReadString(4);
                    else if (r >= 97) {
                      e.type = '';
                      for (f = 0; f < 4; f++) {
                        var h = l;
                        do {
                          h = h[t.ReadBit()];
                        } while (Array.isArray(h));
                        e.type += h;
                      }
                    }
                    e.type = e.type.trim().replace(/\0/g, '');
                    var p = g(e, i);
                    (e.categories = null == p ? void 0 : p.c),
                      (null == e ? void 0 : e.categories.includes('Any Armor'))
                        ? (e.type_id = n.Armor)
                        : (null == e ? void 0 : e.categories.includes('Weapon'))
                        ? ((e.type_id = n.Weapon), (p = i.weapon_items[e.type]))
                        : (e.type_id = n.Other);
                    var v = e.simple_item ? 1 : 3;
                    (null === (s = e.categories) || void 0 === s
                      ? void 0
                      : s.includes('Quest')) &&
                      ((e.quest_difficulty =
                        t.ReadUInt16(i.magical_properties[356].sB) -
                        i.magical_properties[356].sA),
                      (v = 1)),
                      (e.nr_of_items_in_sockets = t.ReadUInt8(v));
                  }
                })((d = {}), e, t, (i = r)),
                !d.simple_item)
              ) {
                switch (
                  ((d.id = e.ReadUInt32(32)),
                  (d.level = e.ReadUInt8(7)),
                  (d.quality = e.ReadUInt8(4)),
                  (d.multiple_pictures = e.ReadBit()),
                  d.multiple_pictures && (d.picture_id = e.ReadUInt8(3)),
                  (d.class_specific = e.ReadBit()),
                  d.class_specific && (d.auto_affix_id = e.ReadUInt16(11)),
                  d.quality)
                ) {
                  case s.Low:
                    d.low_quality_id = e.ReadUInt8(3);
                    break;
                  case s.Normal:
                    break;
                  case s.Superior:
                    d.file_index = e.ReadUInt8(3);
                    break;
                  case s.Magic:
                    (d.magic_prefix = e.ReadUInt16(11)),
                      d.magic_prefix &&
                        (d.magic_prefix_name = i.magic_prefixes[d.magic_prefix]
                          ? i.magic_prefixes[d.magic_prefix].n
                          : null),
                      (d.magic_suffix = e.ReadUInt16(11)),
                      d.magic_suffix &&
                        (d.magic_suffix_name = i.magic_suffixes[d.magic_suffix]
                          ? i.magic_suffixes[d.magic_suffix].n
                          : null);
                    break;
                  case s.Set:
                    (d.set_id = e.ReadUInt16(12)),
                      (d.set_name = i.set_items[d.set_id]
                        ? i.set_items[d.set_id].n
                        : null);
                    break;
                  case s.Unique:
                    (d.unique_id = e.ReadUInt16(12)),
                      (d.unique_name = i.unq_items[d.unique_id]
                        ? i.unq_items[d.unique_id].n
                        : null);
                    break;
                  case s.Rare:
                  case s.Crafted:
                    for (
                      d.rare_name_id = e.ReadUInt8(8),
                        d.rare_name_id &&
                          (d.rare_name = i.rare_names[d.rare_name_id]
                            ? i.rare_names[d.rare_name_id].n
                            : null),
                        d.rare_name_id2 = e.ReadUInt8(8),
                        d.rare_name_id2 &&
                          (d.rare_name2 = i.rare_names[d.rare_name_id2]
                            ? i.rare_names[d.rare_name_id2].n
                            : null),
                        d.magical_name_ids = [],
                        m = 0;
                      m < 6;
                      m++
                    )
                      (u = e.ReadBit()),
                        (d.magical_name_ids[m] =
                          1 === u ? e.ReadUInt16(11) : null);
                }
                if (
                  (d.given_runeword &&
                    ((d.runeword_id = e.ReadUInt16(12)),
                    2718 == d.runeword_id && (d.runeword_id = 48),
                    i.runewords[d.runeword_id] &&
                      (d.runeword_name = i.runewords[d.runeword_id].n),
                    e.ReadUInt8(4)),
                  d.personalized)
                ) {
                  for (
                    f = new Uint8Array(16), m = 0;
                    m < f.length &&
                    ((f[m] = t > 97 ? e.ReadUInt8(8) : e.ReadUInt8(7)),
                    0 !== f[m]);
                    m++
                  );
                  d.personalized_name = new o.BitReader(f)
                    .ReadString(16)
                    .trim()
                    .replace(/\0/g, '');
                }
                for (
                  ('tbk' !== d.type && 'ibk' != d.type) || e.ReadUInt8(5),
                    d.timestamp = e.ReadUInt8(1),
                    d.type_id === n.Armor &&
                      (d.defense_rating =
                        e.ReadUInt16(i.magical_properties[31].sB) -
                        i.magical_properties[31].sA),
                    (d.type_id !== n.Armor && d.type_id !== n.Weapon) ||
                      ((d.max_durability =
                        e.ReadUInt16(i.magical_properties[73].sB) -
                        i.magical_properties[73].sA),
                      d.max_durability > 0 &&
                        (d.current_durability =
                          e.ReadUInt16(i.magical_properties[72].sB) -
                          i.magical_properties[72].sA)),
                    i.stackables[d.type] && (d.quantity = e.ReadUInt16(9)),
                    1 === d.socketed &&
                      (d.total_nr_of_sockets = e.ReadUInt8(4)),
                    h = 0,
                    d.quality === s.Set &&
                      ((h = e.ReadUInt8(5)),
                      (d.set_list_count = 0),
                      (d._unknown_data.plist_flag = h)),
                    p = v(e, i),
                    d.magic_attributes = p;
                  h > 0;

                )
                  1 & h &&
                    ((d.set_list_count += 1),
                    (p = v(e, i)),
                    d.set_attributes
                      ? d.set_attributes.push(p)
                      : (d.set_attributes = [p])),
                    (h >>>= 1);
                1 === d.given_runeword &&
                  (p = v(e, i)) &&
                  p.length > 0 &&
                  (d.runeword_attributes = p);
              }
              if (
                (e.Align(),
                !(d.nr_of_items_in_sockets > 0 && 0 === d.simple_item))
              )
                return [3, 4];
              (d.socketed_items = []), (m = 0), (a.label = 1);
            case 1:
              return m < d.nr_of_items_in_sockets
                ? ((b = (y = d.socketed_items).push), [4, _(e, t, i, c, d)])
                : [3, 4];
            case 2:
              b.apply(y, [a.sent()]), (a.label = 3);
            case 3:
              return m++, [3, 1];
            case 4:
              return [2, d];
          }
        });
      });
    }
    function h(e, t, r, o) {
      var l;
      return i(this, void 0, void 0, function () {
        var i, u, f, _, v, y, b, w, W;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              if (
                (void 0 === e._unknown_data && (e._unknown_data = {}),
                void 0 === e.categories &&
                  (e.categories =
                    null === (l = g(e, r)) || void 0 === l ? void 0 : l.c),
                (i = new c.BitWriter()),
                t <= 96 && i.WriteString('JM', 2),
                (function (e, t, r, i, a) {
                  var n;
                  e.WriteBits(r._unknown_data.b0_3 || new Uint8Array(4), 4),
                    e.WriteBit(r.identified),
                    e.WriteBits(r._unknown_data.b5_10 || new Uint8Array(6), 6),
                    e.WriteBit(r.socketed),
                    e.WriteBits(r._unknown_data.b12 || new Uint8Array(1), 1),
                    e.WriteBit(r.new),
                    e.WriteBits(r._unknown_data.b14_15 || new Uint8Array(2), 2),
                    e.WriteBit(r.is_ear),
                    e.WriteBit(r.starter_item),
                    e.WriteBits(r._unknown_data.b18_20 || new Uint8Array(3), 3),
                    e.WriteBit(r.simple_item),
                    e.WriteBit(r.ethereal),
                    e.WriteBits(r._unknown_data.b23 || new Uint8Array([1]), 1),
                    e.WriteBit(r.personalized),
                    e.WriteBits(r._unknown_data.b25 || new Uint8Array(1), 1),
                    e.WriteBit(r.given_runeword),
                    e.WriteBits(r._unknown_data.b27_31 || new Uint8Array(5), 5);
                  var s = null != r.version ? r.version : '101';
                  t <= 96
                    ? e.WriteUInt16(parseInt(s, 10), 10)
                    : t >= 97 && e.WriteUInt16(parseInt(s, 2), 3);
                  if (
                    (e.WriteUInt8(r.location_id, 3),
                    e.WriteUInt8(r.equipped_id, 4),
                    e.WriteUInt8(r.position_x, 4),
                    e.WriteUInt8(r.position_y, 4),
                    e.WriteUInt8(r.alt_position_id, 3),
                    r.is_ear)
                  ) {
                    e.WriteUInt8(r.ear_attributes.class, 3),
                      e.WriteUInt8(r.ear_attributes.level, 7);
                    for (
                      var o = r.ear_attributes.name.substring(0, 15), c = 0;
                      c < o.length;
                      c++
                    )
                      e.WriteUInt8(127 & o.charCodeAt(c), 7);
                    e.WriteUInt8(0, 7);
                  } else {
                    var l = r.type.padEnd(4, ' ');
                    if (t <= 96) e.WriteString(l, 4);
                    else
                      for (var u = 0, f = l; u < f.length; u++) {
                        var _ = f[u],
                          h = d[_];
                        e.WriteUInt16(h.v, h.l);
                      }
                    var p = r.simple_item ? 1 : 3;
                    if (
                      null === (n = r.categories) || void 0 === n
                        ? void 0
                        : n.includes('Quest')
                    ) {
                      var v = r.quest_difficulty || 0;
                      e.WriteUInt16(
                        v + i.magical_properties[356].sA,
                        i.magical_properties[356].sB
                      ),
                        (p = 1);
                    }
                    e.WriteUInt8(r.nr_of_items_in_sockets, p);
                  }
                })(i, t, e, r),
                !e.simple_item)
              ) {
                switch (
                  (i.WriteUInt32(e.id, 32),
                  i.WriteUInt8(e.level, 7),
                  i.WriteUInt8(e.quality, 4),
                  i.WriteUInt8(e.multiple_pictures, 1),
                  e.multiple_pictures && i.WriteUInt8(e.picture_id, 3),
                  i.WriteUInt8(e.class_specific, 1),
                  1 === e.class_specific &&
                    i.WriteUInt16(e.auto_affix_id || 0, 11),
                  e.quality)
                ) {
                  case s.Low:
                    i.WriteUInt8(e.low_quality_id, 3);
                    break;
                  case s.Normal:
                    break;
                  case s.Superior:
                    i.WriteUInt8(e.file_index || 0, 3);
                    break;
                  case s.Magic:
                    i.WriteUInt16(e.magic_prefix, 11),
                      i.WriteUInt16(e.magic_suffix, 11);
                    break;
                  case s.Set:
                    i.WriteUInt16(e.set_id, 12);
                    break;
                  case s.Unique:
                    i.WriteUInt16(e.unique_id, 12);
                    break;
                  case s.Rare:
                  case s.Crafted:
                    for (
                      i.WriteUInt8(
                        void 0 !== e.rare_name_id
                          ? e.rare_name_id
                          : p(e.rare_name, r),
                        8
                      ),
                        i.WriteUInt8(
                          void 0 !== e.rare_name_id2
                            ? e.rare_name_id2
                            : p(e.rare_name2, r),
                          8
                        ),
                        b = 0;
                      b < 6;
                      b++
                    )
                      (u = e.magical_name_ids[b])
                        ? (i.WriteBit(1), i.WriteUInt16(u, 11))
                        : i.WriteBit(0);
                }
                if (
                  (e.given_runeword &&
                    (2718 == (f = e.runeword_id) && (f = 48),
                    i.WriteUInt16(f, 12),
                    i.WriteUInt8(5, 4)),
                  e.personalized)
                ) {
                  for (
                    _ = e.personalized_name.substring(0, 16), b = 0;
                    b < _.length;
                    b++
                  )
                    t > 97
                      ? i.WriteUInt8(_.charCodeAt(b), 8)
                      : i.WriteUInt8(127 & _.charCodeAt(b), 7);
                  i.WriteUInt8(0, t > 97 ? 8 : 7);
                }
                if (
                  ('tbk' === e.type
                    ? i.WriteUInt8(0, 5)
                    : 'ibk' === e.type && i.WriteUInt8(1, 5),
                  i.WriteUInt8(e.timestamp, 1),
                  (e.type_id !== n.Armor && e.type_id !== n.Shield) ||
                    i.WriteUInt16(
                      e.defense_rating + r.magical_properties[31].sA,
                      r.magical_properties[31].sB
                    ),
                  (e.type_id !== n.Armor &&
                    e.type_id !== n.Shield &&
                    e.type_id !== n.Weapon) ||
                    (i.WriteUInt16(
                      e.max_durability || 0,
                      r.magical_properties[73].sB
                    ),
                    e.max_durability > 0 &&
                      i.WriteUInt16(
                        e.current_durability,
                        r.magical_properties[72].sB
                      )),
                  r.stackables[e.type] && i.WriteUInt16(e.quantity, 9),
                  1 === e.socketed && i.WriteUInt8(e.total_nr_of_sockets, 4),
                  e.quality === s.Set &&
                    ((v =
                      null != e.set_attributes ? e.set_attributes.length : 0),
                    (y = (1 << v) - 1),
                    i.WriteUInt8(e._unknown_data.plist_flag || y, 5)),
                  m(i, e.magic_attributes, r),
                  e.set_attributes && e.set_attributes.length > 0)
                )
                  for (b = 0; b < e.set_attributes.length; b++)
                    m(i, e.set_attributes[b], r);
                1 === e.given_runeword && m(i, e.runeword_attributes, r);
              }
              if (
                (i.Align(),
                !(e.nr_of_items_in_sockets > 0 && 0 === e.simple_item))
              )
                return [3, 4];
              (b = 0), (a.label = 1);
            case 1:
              return b < e.nr_of_items_in_sockets
                ? ((W = (w = i).WriteArray),
                  [4, h(e.socketed_items[b], t, r, o)])
                : [3, 4];
            case 2:
              W.apply(w, [a.sent()]), (a.label = 3);
            case 3:
              return b++, [3, 1];
            case 4:
              return [2, i.ToArray()];
          }
        });
      });
    }
    function p(e, t) {
      return t.rare_names.findIndex(function (t) {
        return (
          t &&
          (t.n.toLowerCase().startsWith(e.toLowerCase()) ||
            e.toLowerCase().startsWith(t.n.toLowerCase()))
        );
      });
    }
    function v(e, t) {
      for (var r = e.ReadUInt16(9), i = []; 511 != r; ) {
        var a = [];
        if (r > t.magical_properties.length)
          throw new Error(
            'Invalid Stat Id: ' + r + ' at position ' + (e.offset - 9)
          );
        for (var n = t.magical_properties[r].np || 1, s = 0; s < n; s++) {
          var o = t.magical_properties[r + s];
          if (null == o)
            throw new Error(
              'Cannot find Magical Property for id: ' +
                r +
                ' at position ' +
                e.offset
            );
          if (o.sP) {
            var c = e.ReadUInt16(o.sP);
            switch (o.dF) {
              case 14:
                a.push(7 & c), (c = (c >> 3) & 8191);
            }
            switch (o.e) {
              case 1:
                break;
              case 2:
              case 3:
                a.push(63 & c), (c = (c >> 6) & 1023);
            }
            a.push(c);
          }
          if (!o.sB)
            throw new Error(
              'Save Bits is undefined for stat: ' +
                r +
                ':' +
                o.s +
                ' at position ' +
                e.offset
            );
          var l = e.ReadUInt16(o.sB);
          switch ((o.sA && (l -= o.sA), o.e)) {
            case 3:
              a.push(255 & l), a.push((l >> 8) & 255);
              break;
            default:
              a.push(l);
          }
        }
        i.push({ id: r, values: a, name: t.magical_properties[r].s }),
          (r = e.ReadUInt16(9));
      }
      return i;
    }
    function m(e, t, r) {
      if (t)
        for (var i = 0; i < t.length; i++) {
          var a = t[i],
            n = 0;
          e.WriteUInt16(a.id, 9);
          for (var s = r.magical_properties[a.id].np || 1, o = 0; o < s; o++) {
            var c = r.magical_properties[a.id + o];
            if (null == c)
              throw new Error('Cannot find Magical Property for id: ' + a.id);
            if (c.sP) {
              var l = a.values[n++];
              switch (c.dF) {
                case 14:
                  l |= (8191 & a.values[n++]) << 3;
              }
              switch (c.e) {
                case 1:
                  break;
                case 2:
                case 3:
                  l |= (1023 & a.values[n++]) << 6;
              }
              e.WriteUInt32(l, c.sP);
            }
            var d = a.values[n++];
            switch ((c.sA && (d += c.sA), c.e)) {
              case 3:
                d |= (255 & a.values[n++]) << 8;
            }
            if (!c.sB)
              throw new Error(
                'Save Bits is undefined for stat: ' + a.id + ':' + c.s
              );
            e.WriteUInt32(d, c.sB);
          }
        }
      e.WriteUInt16(511, 9);
    }
    function g(e, t) {
      return t.armor_items[e.type]
        ? t.armor_items[e.type]
        : t.weapon_items[e.type]
        ? t.weapon_items[e.type]
        : t.other_items[e.type]
        ? t.other_items[e.type]
        : void 0;
    }
    (t.readCharItems = function (e, t, r, n) {
      return i(this, void 0, void 0, function () {
        var i;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return (i = e), [4, u(t, e.header.version, r, n, e)];
            case 1:
              return (i.items = a.sent()), [2];
          }
        });
      });
    }),
      (t.writeCharItems = function (e, t, r) {
        return i(this, void 0, void 0, function () {
          var i, n, s;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (i = new c.BitWriter()),
                  (s = (n = i).WriteArray),
                  [4, f(e.items, e.header.version, t, r)]
                );
              case 1:
                return s.apply(n, [a.sent()]), [2, i.ToArray()];
            }
          });
        });
      }),
      (t.readMercItems = function (e, t, r, n) {
        return i(this, void 0, void 0, function () {
          var i;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (((e.merc_items = []), 'jf' !== t.ReadString(2))) {
                  if (1 === (null == e ? void 0 : e.header.level)) return [2];
                  throw new Error(
                    "Mercenary header 'jf' not found at position " +
                      (t.offset - 16)
                  );
                }
                return e.header.merc_id && 0 !== parseInt(e.header.merc_id, 16)
                  ? ((i = e), [4, u(t, e.header.version, r, n, e)])
                  : [3, 2];
              case 1:
                (i.merc_items = a.sent()), (a.label = 2);
              case 2:
                return [2];
            }
          });
        });
      }),
      (t.writeMercItems = function (e, t, r) {
        return i(this, void 0, void 0, function () {
          var i, n, s;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (i = new c.BitWriter()).WriteString('jf', 2),
                  e.header.merc_id && 0 !== parseInt(e.header.merc_id, 16)
                    ? ((e.merc_items = e.merc_items || []),
                      (s = (n = i).WriteArray),
                      [4, f(e.merc_items, e.header.version, t, r)])
                    : [3, 2]
                );
              case 1:
                s.apply(n, [a.sent()]), (a.label = 2);
              case 2:
                return [2, i.ToArray()];
            }
          });
        });
      }),
      (t.readGolemItems = function (e, t, r, n) {
        return i(this, void 0, void 0, function () {
          var i;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if ('kf' !== t.ReadString(2)) {
                  if (1 === (null == e ? void 0 : e.header.level)) return [2];
                  throw new Error(
                    "Golem header 'kf' not found at position " + (t.offset - 16)
                  );
                }
                return 1 !== t.ReadUInt8()
                  ? [3, 2]
                  : ((i = e), [4, _(t, e.header.version, r, n)]);
              case 1:
                (i.golem_item = a.sent()), (a.label = 2);
              case 2:
                return [2];
            }
          });
        });
      }),
      (t.writeGolemItems = function (e, t, r) {
        return i(this, void 0, void 0, function () {
          var i, n, s;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (i = new c.BitWriter()).WriteString('kf', 2),
                  e.golem_item
                    ? (i.WriteUInt8(1),
                      (s = (n = i).WriteArray),
                      [4, h(e.golem_item, e.header.version, t, r)])
                    : [3, 2]
                );
              case 1:
                return s.apply(n, [a.sent()]), [3, 3];
              case 2:
                i.WriteUInt8(0), (a.label = 3);
              case 3:
                return [2, i.ToArray()];
            }
          });
        });
      }),
      (t.readCorpseItems = function (e, t, r, n) {
        return i(this, void 0, void 0, function () {
          var i, s, o, c;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (((e.corpse_items = []), 'JM' !== t.ReadString(2))) {
                  if (1 === e.header.level) return (e.is_dead = 0), [2];
                  throw new Error(
                    "Corpse header 'JM' not found at position " +
                      (t.offset - 16)
                  );
                }
                (e.is_dead = t.ReadUInt16()), (i = 0), (a.label = 1);
              case 1:
                return i < e.is_dead
                  ? (t.SkipBytes(12),
                    (s = e),
                    (c = (o = e.corpse_items).concat),
                    [4, u(t, e.header.version, r, n, e)])
                  : [3, 4];
              case 2:
                (s.corpse_items = c.apply(o, [a.sent()])), (a.label = 3);
              case 3:
                return i++, [3, 1];
              case 4:
                return [2];
            }
          });
        });
      }),
      (t.writeCorpseItem = function (e, t, r) {
        return i(this, void 0, void 0, function () {
          var i, n, s;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (i = new c.BitWriter()).WriteString('JM', 2),
                  i.WriteUInt16(e.is_dead),
                  e.is_dead
                    ? (i.WriteArray(new Uint8Array(12)),
                      (e.corpse_items = e.corpse_items || []),
                      (s = (n = i).WriteArray),
                      [4, f(e.corpse_items, e.header.version, t, r)])
                    : [3, 2]
                );
              case 1:
                s.apply(n, [a.sent()]), (a.label = 2);
              case 2:
                return [2, i.ToArray()];
            }
          });
        });
      }),
      (t.readItems = u),
      (t.writeItems = f),
      (t.readItem = _),
      (t.writeItem = h),
      (t._readMagicProperties = v),
      (t._writeMagicProperties = m);
  },
  function (e, t, r) {
    'use strict';
    var i =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, i) {
              void 0 === i && (i = r),
                Object.defineProperty(e, i, {
                  enumerable: !0,
                  get: function () {
                    return t[r];
                  },
                });
            }
          : function (e, t, r, i) {
              void 0 === i && (i = r), (e[i] = t[r]);
            }),
      a =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, t) {
              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
            }
          : function (e, t) {
              e.default = t;
            }),
      n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e)
              'default' !== r && Object.hasOwnProperty.call(e, r) && i(t, e, r);
          return a(t, e), t;
        },
      s =
        (this && this.__spreadArrays) ||
        function () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++)
            e += arguments[t].length;
          var i = Array(e),
            a = 0;
          for (t = 0; t < r; t++)
            for (var n = arguments[t], s = 0, o = n.length; s < o; s++, a++)
              i[a] = n[s];
          return i;
        };
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.readConstantData = void 0);
    var o = n(r(8)),
      c = {
        item_maxdamage_percent: {
          numprops: 2,
          rangestr: 'strModMinDamageRange',
          equalstr: 'strModEnhancedDamage',
        },
        firemindam: {
          numprops: 2,
          rangestr: 'strModFireDamageRange',
          equalstr: 'strModFireDamage',
        },
        lightmindam: {
          numprops: 2,
          rangestr: 'strModLightningDamageRange',
          equalstr: 'strModLightningDamage',
        },
        magicmindam: {
          numprops: 2,
          rangestr: 'strModMagicDamageRange',
          equalstr: 'strModMagicDamage',
        },
        coldmindam: {
          numprops: 3,
          rangestr: 'strModColdDamageRange',
          equalstr: 'strModColdDamage',
        },
        poisonmindam: {
          numprops: 3,
          rangestr: 'strModPoisonDamageRange',
          equalstr: 'strModPoisonDamage',
        },
      };
    function l(e, t) {
      return (
        (r = d(e, t)),
        {
          header: (i = r.split(/\r?\n/).map(function (e) {
            return e.split(/\t/);
          }))[0],
          lines: i,
        }
      );
      var r, i;
    }
    function d(e, t) {
      var r = Object.keys(e).find(function (e) {
        return e.toLowerCase() === t.toLowerCase();
      });
      if (!r) throw new Error('Cannot find file: ' + t);
      return e[r];
    }
    function u(e) {
      var t = {};
      return (
        e
          .split(/\r?\n/)
          .map(function (e) {
            return e.split(/\t/);
          })
          .map(function (e) {
            t[e[0]] || (t[e[0]] = e[1]);
          }),
        t
      );
    }
    function f(e) {
      var t = {};
      65279 === e.charCodeAt(0) && (e = e.slice(1));
      for (var r = 0, i = JSON.parse(e); r < i.length; r++) {
        var a = i[r];
        t[a.Key] = a.enUS;
      }
      return t;
    }
    function _(e, t, r) {
      for (
        var i = [], a = e.header.indexOf('name'), n = t, s = 1;
        s < e.lines.length;
        s++
      ) {
        var o = e.lines[s][a];
        o && ((i[n - t] = { n: r[o] }), n++);
      }
      return i;
    }
    function h(e, t) {
      for (
        var r = [],
          i = e.header.indexOf('Name'),
          a = e.header.indexOf('transformcolor'),
          n = 1,
          s = 1;
        s < e.lines.length;
        s++
      ) {
        var o = e.lines[s][i];
        if ('Expansion' != o) {
          var c = {};
          (c.n = t[o]),
            e.lines[s][a] && (c.tc = e.lines[s][a]),
            (r[n] = c),
            n++;
        }
      }
      return r;
    }
    function p(e, t) {
      var r = [];
      return (
        void 0 !== e[t] && (r = s([e[t].n], p(e, e[t].eq1), p(e, e[t].eq2))), r
      );
    }
    function v(e, t, r) {
      for (
        var i = [],
          a = e.header.indexOf('code'),
          n = e.header.indexOf('namestr'),
          s = e.header.indexOf('stackable'),
          c = e.header.indexOf('minac'),
          l = e.header.indexOf('maxac'),
          d = e.header.indexOf('durability'),
          u = e.header.indexOf('mindam'),
          f = e.header.indexOf('maxdam'),
          _ = e.header.indexOf('2handmindam'),
          h = e.header.indexOf('2handmaxdam'),
          p = e.header.indexOf('minmisdam'),
          v = e.header.indexOf('maxmisdam'),
          m = e.header.indexOf('reqstr'),
          g = e.header.indexOf('reqdex'),
          y = e.header.indexOf('hasinv'),
          b = e.header.indexOf('gemapplytype'),
          w = e.header.indexOf('invfile'),
          W = e.header.indexOf('uniqueinvfile'),
          B = e.header.indexOf('setinvfile'),
          x = e.header.indexOf('invwidth'),
          k = e.header.indexOf('invheight'),
          I = e.header.indexOf('InvTrans'),
          A = e.header.indexOf('type'),
          R = e.header.indexOf('normcode'),
          U = e.header.indexOf('ubercode'),
          O = e.header.indexOf('ultracode'),
          S = 1;
        S < e.lines.length;
        S++
      ) {
        var M = e.lines[S][a];
        if (M) {
          var P = {};
          (P.code = M),
            (P.nc = e.lines[S][R]),
            (P.exc = e.lines[S][U]),
            (P.elc = e.lines[S][O]),
            (P.iq =
              P.code === P.exc
                ? o.EItemQuality.exceptional
                : P.code === P.elc
                ? o.EItemQuality.elite
                : o.EItemQuality.normal),
            (P.n = r[e.lines[S][n]]),
            e.lines[S][s] && +e.lines[S][s] > 0 && (P.s = 1),
            e.lines[S][c] && +e.lines[S][c] > 0 && (P.minac = +e.lines[S][c]),
            e.lines[S][l] && +e.lines[S][l] > 0 && (P.maxac = +e.lines[S][l]),
            e.lines[S][d] && (P.durability = +e.lines[S][d]),
            e.lines[S][u] && +e.lines[S][u] > 0 && (P.mind = +e.lines[S][u]),
            e.lines[S][f] && +e.lines[S][f] > 0 && (P.maxd = +e.lines[S][f]),
            e.lines[S][_] && +e.lines[S][_] > 0 && (P.min2d = +e.lines[S][_]),
            e.lines[S][h] && +e.lines[S][h] > 0 && (P.max2d = +e.lines[S][h]),
            e.lines[S][p] && +e.lines[S][p] > 0 && (P.minmd = +e.lines[S][p]),
            e.lines[S][v] && +e.lines[S][v] > 0 && (P.maxmd = +e.lines[S][v]),
            e.lines[S][m] && (P.rs = +e.lines[S][m]),
            e.lines[S][g] && (P.rd = +e.lines[S][g]),
            e.lines[S][y] && (P.hi = +e.lines[S][y]),
            e.lines[S][b] && (P.gt = +e.lines[S][b]),
            e.lines[S][w] && (P.i = e.lines[S][w]),
            e.lines[S][W] && (P.ui = e.lines[S][W]),
            e.lines[S][B] && (P.si = e.lines[S][B]),
            e.lines[S][x] && (P.iw = +e.lines[S][x]),
            e.lines[S][k] && (P.ih = +e.lines[S][k]),
            e.lines[S][I] && (P.it = +e.lines[S][I]);
          var j = t[e.lines[S][A]];
          j &&
            j.ig &&
            ((P.ig = j.ig), (P.eq1n = j.eq1n), (P.eq2n = j.eq2n), (P.c = j.c)),
            i.push(P);
        }
      }
      return i;
    }
    function m(e, t) {
      var r = [],
        i = e.header.indexOf('index'),
        a = e.header.indexOf('invfile'),
        n = e.header.indexOf('code');
      n < 0 && (n = e.header.indexOf('item'));
      for (
        var s = e.header.indexOf('invtransform'), o = 0, c = 1;
        c < e.lines.length;
        c++
      ) {
        var l = e.lines[c][i];
        if (l && 'Expansion' != l) {
          var d = {};
          (d.n = t[e.lines[c][i]]),
            e.lines[c][a] && (d.i = e.lines[c][a]),
            e.lines[c][n] && (d.c = e.lines[c][n]),
            e.lines[c][s] && (d.tc = e.lines[c][s]),
            (r[o] = d),
            o++;
        }
      }
      return r;
    }
    t.readConstantData = function (e) {
      var t,
        r,
        i = {},
        a = {};
      (t = e),
        (r = 'strings.txt'),
        null !=
        Object.keys(t).find(function (e) {
          return e.toLowerCase() === r.toLowerCase();
        })
          ? ((a = u(d(e, 'string.txt'))),
            (a = Object.assign(a, u(d(e, 'expansionstring.txt')))),
            (a = Object.assign(a, u(d(e, 'patchstring.txt')))))
          : ((a = f(d(e, 'item-gems.json'))),
            (a = Object.assign(a, f(d(e, 'item-modifiers.json')))),
            (a = Object.assign(a, f(d(e, 'item-nameaffixes.json')))),
            (a = Object.assign(a, f(d(e, 'item-names.json')))),
            (a = Object.assign(a, f(d(e, 'item-runes.json')))),
            (a = Object.assign(a, f(d(e, 'skills.json'))))),
        (i.classes = (function (e, t, r) {
          for (
            var i = [],
              a = e.header.indexOf('class'),
              n = e.header.indexOf('str'),
              s = e.header.indexOf('dex'),
              o = e.header.indexOf('int'),
              c = e.header.indexOf('vit'),
              l = e.header.indexOf('stamina'),
              d = e.header.indexOf('hpadd'),
              u = e.header.indexOf('LifePerLevel'),
              f = e.header.indexOf('StaminaPerLevel'),
              _ = e.header.indexOf('ManaPerLevel'),
              h = e.header.indexOf('LifePerVitality'),
              p = e.header.indexOf('StaminaPerVitality'),
              v = e.header.indexOf('ManaPerMagic'),
              m = e.header.indexOf('StrAllSkills'),
              g = e.header.indexOf('StrSkillTab1'),
              y = e.header.indexOf('StrSkillTab2'),
              b = e.header.indexOf('StrSkillTab3'),
              w = e.header.indexOf('StrClassOnly'),
              W = t.header.indexOf('Code'),
              B = 0,
              x = 1;
            x < e.lines.length;
            x++
          ) {
            var k = e.lines[x][a];
            k &&
              'Expansion' != k &&
              ((i[B] = {
                n: k,
                c: t.lines[x][W],
                as: r[e.lines[x][m]],
                ts: [r[e.lines[x][g]], r[e.lines[x][y]], r[e.lines[x][b]]],
                co: r[e.lines[x][w]],
                s: {
                  lpl: +e.lines[x][u],
                  mpl: +e.lines[x][_],
                  spl: +e.lines[x][f],
                  lpv: +e.lines[x][h],
                  spv: +e.lines[x][p],
                  mpe: +e.lines[x][v],
                },
                a: {
                  str: +e.lines[x][n],
                  dex: +e.lines[x][s],
                  int: +e.lines[x][o],
                  vit: +e.lines[x][c],
                  stam: +e.lines[x][l],
                  hpadd: e.lines[x][d],
                },
              }),
              B++);
          }
          return i;
        })(l(e, 'CharStats.txt'), l(e, 'PlayerClass.txt'), a));
      var n = (function (e, t) {
        for (
          var r = {},
            i = e.header.indexOf('skilldesc'),
            a = e.header.indexOf('str name'),
            n = 1;
          n < e.lines.length;
          n++
        ) {
          var s = e.lines[n][i],
            o = e.lines[n][a];
          s && o && (r[s] = t[o]);
        }
        return r;
      })(l(e, 'SkillDesc.txt'), a);
      (i.skills = (function (e, t, r) {
        var i = [],
          a = e.header.indexOf('skilldesc'),
          n = e.header.indexOf('Id');
        n < 0 && (n = e.header.indexOf('*Id'));
        for (
          var s = e.header.indexOf('charclass'), o = 1;
          o < e.lines.length;
          o++
        ) {
          var c = +e.lines[o][n],
            l = e.lines[o][a];
          if (l) {
            var d = {};
            t[l] && (d.s = t[l]),
              e.lines[o][s] && (d.c = e.lines[o][s]),
              (i[c] = d);
          }
        }
        return i;
      })(l(e, 'skills.txt'), n)),
        (i.rare_names = [null].concat(_(l(e, 'RareSuffix.txt'), 1, a))),
        (i.rare_names = i.rare_names.concat(
          _(l(e, 'RarePrefix.txt'), i.rare_names.length, a)
        )),
        (i.magic_prefixes = h(l(e, 'MagicPrefix.txt'), a)),
        (i.magic_suffixes = h(l(e, 'MagicSuffix.txt'), a)),
        (i.properties = (function (e, t) {
          for (
            var r = {}, i = e.header.indexOf('code'), a = [], n = 1;
            n <= 7;
            n++
          )
            (a[n] = {}),
              (a[n].cStat = e.header.indexOf('stat' + n)),
              (a[n].cFunc = e.header.indexOf('func' + n));
          for (var s = 1; s < e.lines.length; s++) {
            var o = e.lines[s][i];
            if ('Expansion' != o) {
              var c = [];
              for (n = 1; n <= 7; n++) {
                var l = e.lines[s][a[n].cStat],
                  d = e.lines[s][a[n].cFunc];
                if (!l && !d) break;
                var u = {};
                l && (u.s = l), d && (u.f = +d), (c[n - 1] = u);
              }
              c.length && (r[o] = c);
            }
          }
          return r;
        })(l(e, 'Properties.txt'))),
        (i.magical_properties = (function (e, t) {
          var r = [],
            i = e.header.indexOf('Stat'),
            a = e.header.indexOf('ID');
          a < 0 && (a = e.header.indexOf('*ID'));
          for (
            var n = e.header.indexOf('CSvBits'),
              s = e.header.indexOf('CSvParam'),
              o = e.header.indexOf('CSvSigned'),
              l = e.header.indexOf('Encode'),
              d = e.header.indexOf('ValShift'),
              u = e.header.indexOf('Signed'),
              f = e.header.indexOf('Save Bits'),
              _ = e.header.indexOf('Save Add'),
              h = e.header.indexOf('Save Param Bits'),
              p = e.header.indexOf('descpriority'),
              v = e.header.indexOf('descfunc'),
              m = e.header.indexOf('descval'),
              g = e.header.indexOf('descstrpos'),
              y = e.header.indexOf('descstrneg'),
              b = e.header.indexOf('descstr2'),
              w = e.header.indexOf('dgrp'),
              W = e.header.indexOf('dgrpfunc'),
              B = e.header.indexOf('dgrpval'),
              x = e.header.indexOf('dgrpstrpos'),
              k = e.header.indexOf('dgrpstrneg'),
              I = e.header.indexOf('dgrpstr2'),
              A = e.header.indexOf('op'),
              R = e.header.indexOf('op param'),
              U = e.header.indexOf('op base'),
              O = e.header.indexOf('op stat1'),
              S = e.header.indexOf('op stat2'),
              M = e.header.indexOf('op stat3'),
              P = 1;
            P < e.lines.length;
            P++
          ) {
            var j = +e.lines[P][a],
              q = e.lines[P][i];
            if (q) {
              var C = {};
              (C.s = q),
                e.lines[P][n] && (C.cB = +e.lines[P][n]),
                e.lines[P][s] && (C.cP = +e.lines[P][s]),
                e.lines[P][o] && (C.cS = +e.lines[P][o]),
                e.lines[P][l] && (C.e = +e.lines[P][l]),
                e.lines[P][d] && (C.vS = +e.lines[P][d]),
                e.lines[P][u] && (C.sS = +e.lines[P][u]),
                e.lines[P][f] && (C.sB = +e.lines[P][f]),
                e.lines[P][_] && (C.sA = +e.lines[P][_]),
                e.lines[P][h] && (C.sP = +e.lines[P][h]),
                e.lines[P][p] && (C.so = +e.lines[P][p]),
                e.lines[P][v] && (C.dF = +e.lines[P][v]),
                e.lines[P][m] && (C.dV = +e.lines[P][m]),
                e.lines[P][g] && (C.dP = t[e.lines[P][g]]),
                e.lines[P][y] && (C.dN = t[e.lines[P][y]]),
                e.lines[P][b] && (C.d2 = t[e.lines[P][b]]),
                e.lines[P][w] && (C.dg = +e.lines[P][w]),
                e.lines[P][W] && (C.dgF = +e.lines[P][W]),
                e.lines[P][B] && (C.dgV = +e.lines[P][B]),
                e.lines[P][x] && (C.dgP = t[e.lines[P][x]]),
                e.lines[P][k] && (C.dN = t[e.lines[P][k]]),
                e.lines[P][I] && (C.dg2 = t[e.lines[P][I]]),
                e.lines[P][A] && (C.o = +e.lines[P][A]),
                e.lines[P][R] && (C.op = +e.lines[P][R]),
                e.lines[P][U] && (C.ob = e.lines[P][U]),
                e.lines[P][O] && (C.os = [e.lines[P][O]]),
                e.lines[P][S] && (C.os[1] = e.lines[P][S]),
                e.lines[P][M] && (C.os[2] = e.lines[P][M]);
              var E = c[q];
              E &&
                ((C.np = E.numprops),
                (C.dR = t[E.rangestr]),
                (C.dE = t[E.equalstr])),
                (r[j] = C);
            }
          }
          return r;
        })(l(e, 'ItemStatCost.txt'), a)),
        (i.runewords = (function (e, t) {
          for (
            var r = [], i = e.header.indexOf('Name'), a = 1;
            a < e.lines.length;
            a++
          ) {
            var n = e.lines[a][i];
            if (n) {
              var s = +n.substring(8);
              r[(s += s > 75 ? 25 : 26)] = { n: t[e.lines[a][i]] };
            }
          }
          return r;
        })(l(e, 'Runes.txt'), a)),
        (i.set_items = m(l(e, 'SetItems.txt'), a)),
        (i.unq_items = m(l(e, 'UniqueItems.txt'), a));
      var o = (function (e, t) {
          for (
            var r = {},
              i = e.header.indexOf('Code'),
              a = e.header.indexOf('ItemType'),
              n = e.header.indexOf('Equiv1'),
              o = e.header.indexOf('Equiv2'),
              c = [],
              l = 1;
            l <= 6;
            l++
          )
            c.push(e.header.indexOf('InvGfx' + l));
          for (l = 1; l < e.lines.length; l++) {
            var d = e.lines[l][i];
            if (d) {
              for (var u = {}, f = [], _ = 0; _ <= 6; _++)
                e.lines[l][c[_]] && (f[_] = e.lines[l][c[_]]);
              (u.ig = f),
                (u.eq1 = e.lines[l][n]),
                (u.eq2 = e.lines[l][o]),
                (u.n = e.lines[l][a]),
                (u.c = [u.n]),
                (r[d] = u);
            }
          }
          for (var h = 0, v = Object.keys(r); h < v.length; h++) {
            var m = v[h];
            (r[m].c = s(p(r, m))),
              void 0 !== r[m] &&
                void 0 !== r[r[m].eq1] &&
                (r[m].eq1n = r[r[m].eq1].n),
              void 0 !== r[m] &&
                void 0 !== r[r[m].eq2] &&
                (r[m].eq2n = r[r[m].eq2].n);
          }
          return r;
        })(l(e, 'ItemTypes.txt')),
        g = v(l(e, 'Armor.txt'), o, a),
        y = v(l(e, 'Weapons.txt'), o, a),
        b = v(l(e, 'Misc.txt'), o, a);
      return (
        (i.stackables = {}),
        s(g, y, b)
          .filter(function (e) {
            return 1 === e.s;
          })
          .map(function (e) {
            return (i.stackables[e.code] = { n: e.n });
          }),
        (i.armor_items = {}),
        g.map(function (e) {
          (i.armor_items[e.code] = e), delete e.code;
        }),
        (i.weapon_items = {}),
        y.map(function (e) {
          (i.weapon_items[e.code] = e), delete e.code;
        }),
        (i.other_items = {}),
        b.map(function (e) {
          (i.other_items[e.code] = e), delete e.code;
        }),
        (function (e, t, r) {
          for (
            var i = t.header.indexOf('code'),
              a = ['weapon', 'helm', 'shield'],
              n = {},
              s = 0,
              o = a;
            s < o.length;
            s++
          ) {
            n[(_ = o[s])] = [];
            for (var c = 1; c <= 3; c++)
              (n[_][c] = {}),
                (n[_][c].cMod = t.header.indexOf(_ + 'Mod' + c + 'Code')),
                (n[_][c].cParam = t.header.indexOf(_ + 'Mod' + c + 'Param')),
                (n[_][c].cMin = t.header.indexOf(_ + 'Mod' + c + 'Min')),
                (n[_][c].cMax = t.header.indexOf(_ + 'Mod' + c + 'Max'));
          }
          for (var l = 1; l < t.lines.length; l++) {
            var d = t.lines[l][i];
            if (d && 'Expansion' != d)
              for (var u = e[d], f = 0; f < 3; f++) {
                var _ = a[f];
                for (c = 1; c <= 3; c++) {
                  var h = t.lines[l][n[_][c].cMod];
                  if (!h) break;
                  1 == c && (u.m || (u.m = []), (u.m[f] = []));
                  var p = {};
                  (p.m = h),
                    t.lines[l][n[_][c].cParam] &&
                      (p.p = +t.lines[l][n[_][c].cParam]),
                    t.lines[l][n[_][c].cMin] &&
                      (p.min = +t.lines[l][n[_][c].cMin]),
                    t.lines[l][n[_][c].cMax] &&
                      (p.max = +t.lines[l][n[_][c].cMax]),
                    u.m[f].push(p);
                }
              }
          }
        })(i.other_items, l(e, 'Gems.txt')),
        i
      );
    };
  },
]);

D2RMM.copyFile(
  'save-editor-data', // <mod folder>\save-editor-data
  'save-editor-data', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\save-editor-data
  true // overwrite any conflicts
);

const files = [
  // translations
  // we don't have a good way to convert .tbl to .txt
  // 'local\\lng\\eng\\string.tbl',
  // 'local\\lng\\eng\\patchstring.tbl',
  // 'local\\lng\\eng\\expansionstring.tbl',
  // so instead, we'll extract the individual files
  'local\\lng\\strings\\item-gems.json',
  'local\\lng\\strings\\item-modifiers.json',
  'local\\lng\\strings\\item-nameaffixes.json',
  'local\\lng\\strings\\item-names.json',
  'local\\lng\\strings\\item-runes.json',
  'local\\lng\\strings\\skills.json',
  // stats
  'global\\excel\\armor.txt',
  'global\\excel\\charstats.txt',
  'global\\excel\\gems.txt',
  'global\\excel\\itemstatcost.txt',
  'global\\excel\\itemtypes.txt',
  'global\\excel\\magicprefix.txt',
  'global\\excel\\magicsuffix.txt',
  'global\\excel\\misc.txt',
  'global\\excel\\playerclass.txt',
  'global\\excel\\properties.txt',
  'global\\excel\\rareprefix.txt',
  'global\\excel\\raresuffix.txt',
  'global\\excel\\runes.txt',
  'global\\excel\\setitems.txt',
  'global\\excel\\skilldesc.txt',
  'global\\excel\\skills.txt',
  'global\\excel\\uniqueitems.txt',
  'global\\excel\\weapons.txt',
];

const data = {};
for (const file of files) {
  data[file.substring(file.lastIndexOf('\\') + 1, file.length)] =
    D2RMM.readTxt(file);
}

D2RMM.writeTxt(
  'save-editor-data.json',
  JSON.stringify(d2s.readConstantData(data))
);
