# ac-issue-7173

`keyArgs` with `variables` example`.

## Demo steps

1. `git clone https://github.com/hwillson/ac-issue-7173.git`
2. Terminal 1: `cd server; npm start`
3. Terminal 2: `cd client; npm start`
4. Access: http://localhost:3000/
5. Click `Next` once to get a second set of results.
6. Click `Change fooIds` to update the `fooIds` variable, which has been included as part of `keyArgs`.
7. The results will re-render, starting from the beginning.
8. Check the cache dump on-screen; you will see that 2 separate `ROOT_QUERY` cache keys have been used since `fooIds` is configured as part of `keyArgs`. When it was updated in #6, a new cache key was created with the new `fooIds` value as part of it.
9. Click next a couple more times, to verify pagination continues to work from this point forward as expected.
