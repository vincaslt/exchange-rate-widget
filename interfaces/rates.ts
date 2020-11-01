import { Currency } from '../constants';

export interface RatesDataDTO {
  date: string;
  base: Currency;
  rates: {
    [currency in Currency]: number;
  };
}

export interface RatesData extends Omit<RatesDataDTO, 'date'> {
  date: Date;
}

export function fromRatesDataDTO(dto: RatesDataDTO) {
  return {
    ...dto,
    date: new Date(dto.date),
  };
}
