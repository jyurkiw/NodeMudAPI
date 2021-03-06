/**
 * API constants.
 * 
 * @returns An organized constants structure.
 */
function Constants() {
    return {
        status: {
            WARN: 'warn',
            ERROR: 'err',
            OK: 'ok'
        },
        error_messages: {
            AREA_404: "Area %s not found.",
            AREA_404_NO_AREACODE: "Areacode is required.",

            AREA_POST_500: "Areacode and name are required.",
            AREA_PUT_500_SIZE: "Size cannot be set in this fashion.",
            AREA_CREATE_FAIL_UNKNOWN: "Area creation failed for an unknown reason.",

            AREA_DELETE_500_SIZE: "Area %s cannot be deleted while room count > 0.",
            AREA_DELETE_500_BAD_AREACODE: "Area %s does not exist.",
            AREA_DELETE_EXIT_500_BAD_PARAM: "Areacode, Roomnumber, and Command are required parameters.",

            ROOM_POST_500_EXIT: "Exit structure is required.",

            ROOMS_POST_500_NOARG: "Rooms command structure expected and not found.",
            ROOMS_POST_500_BADARG: "Rooms exit api requires roomA and roomB.",

            CHARACTER_POST_500: "Character creation failed."
        },
        warning_messages: {
            AREA_POST_NO_DESC: "Area description not found."
        }
    };
}

module.exports = Constants();