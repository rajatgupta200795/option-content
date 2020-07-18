#! /bin/sh

LD_LIBRARY_PATH="/opt/couchbase/lib":"/opt/couchbase/lib/memcached":$LD_LIBRARY_PATH
export LD_LIBRARY_PATH

CWD="`pwd`"
D0="`dirname "$0"`"
cd "$D0"
root="`pwd`"
cd "$CWD"

exec "$root"/`basename "$0"`.bin "$@"
