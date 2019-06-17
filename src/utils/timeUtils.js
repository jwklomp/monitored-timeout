import moment from "moment";

export const NL_DURATION_FORMAT_HMS = "HH:mm:ss";

export const formatMsAsHMS = ms =>
moment.utc(ms).format(NL_DURATION_FORMAT_HMS);