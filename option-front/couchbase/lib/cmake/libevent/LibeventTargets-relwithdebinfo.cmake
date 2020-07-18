#----------------------------------------------------------------
# Generated CMake target import file for configuration "RelWithDebInfo".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "event" for configuration "RelWithDebInfo"
set_property(TARGET event APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(event PROPERTIES
  IMPORTED_LINK_INTERFACE_LIBRARIES_RELWITHDEBINFO "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/openssl.exploded/lib/libssl.so;/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/openssl.exploded/lib/libcrypto.so;-lpthread;m"
  IMPORTED_LOCATION_RELWITHDEBINFO "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/install/lib/libevent.so.2.1.8"
  IMPORTED_SONAME_RELWITHDEBINFO "libevent.so.2.1.8"
  )

list(APPEND _IMPORT_CHECK_TARGETS event )
list(APPEND _IMPORT_CHECK_FILES_FOR_event "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/install/lib/libevent.so.2.1.8" )

# Import target "event_core" for configuration "RelWithDebInfo"
set_property(TARGET event_core APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(event_core PROPERTIES
  IMPORTED_LINK_INTERFACE_LIBRARIES_RELWITHDEBINFO "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/openssl.exploded/lib/libssl.so;/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/openssl.exploded/lib/libcrypto.so;-lpthread;m"
  IMPORTED_LOCATION_RELWITHDEBINFO "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/install/lib/libevent_core.so.2.1.8"
  IMPORTED_SONAME_RELWITHDEBINFO "libevent_core.so.2.1.8"
  )

list(APPEND _IMPORT_CHECK_TARGETS event_core )
list(APPEND _IMPORT_CHECK_FILES_FOR_event_core "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/install/lib/libevent_core.so.2.1.8" )

# Import target "event_extra" for configuration "RelWithDebInfo"
set_property(TARGET event_extra APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(event_extra PROPERTIES
  IMPORTED_LINK_INTERFACE_LIBRARIES_RELWITHDEBINFO "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/openssl.exploded/lib/libssl.so;/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/openssl.exploded/lib/libcrypto.so;-lpthread;m"
  IMPORTED_LOCATION_RELWITHDEBINFO "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/install/lib/libevent_extra.so.2.1.8"
  IMPORTED_SONAME_RELWITHDEBINFO "libevent_extra.so.2.1.8"
  )

list(APPEND _IMPORT_CHECK_TARGETS event_extra )
list(APPEND _IMPORT_CHECK_FILES_FOR_event_extra "/home/couchbase/jenkins/workspace/cbdeps-platform-build-old/deps/packages/build/libevent/install/lib/libevent_extra.so.2.1.8" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
