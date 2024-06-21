#!/bin/bash

# Removing existing env file
rm .env

# saving variables environment prefix in a variable
varprefix="ARC_FE_"

# Print relevant environment variables
env | grep -i $varprefix

# Recreate config file and assignment

# Loop on environment variables prefixed with
# ARC_FE_ and add them to .env file
for arc_fe_var in $(env | grep ARC_FE_); do
    varname=$(printf '%s\n' "${arc_fe_var#$varprefix}" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$arc_fe_var" | sed -e 's/^[^=]*=//')

    echo "$varname=\"$varvalue\"" >> .env
done

