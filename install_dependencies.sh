#!/bin/bash

# Install pip if not already installed
if ! command -v pip &> /dev/null
then
    # Download get-pip.py
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    # Install pip
    python get-pip.py
    # Clean up
    rm get-pip.py
fi

# Install Django and other dependencies
pip install -r requirements.txt
