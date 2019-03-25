using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace keisoku.Controllers
{
    public class BaseController : ControllerBase
    {
        protected ApplicationDbContext _context;

        /// <summary>
        /// ユーザモデルに該当するCustomerを設定する
        /// </summary>
        /// 
        /// <param name="user">ユーザモデル</param>
        /// 
        /// <returns>Customerの存在有無</returns>
        /// 
        protected async Task<bool> SetCustomer(UserModel user)
        {
            var data = await _context.Customers.SingleOrDefaultAsync(x => x.CustomerId == user.CustomerId);
            if (data == null)
            {
                return false;
            }

            user.Customer = data;

            return true;

        }

        /// <summary>
        /// ユーザモデルに該当するKengenFuyosを設定する
        /// </summary>
        /// 
        /// <param name="user">ユーザモデル</param>
        /// 
        /// <returns>KengenFuyosの存在有無</returns>
        /// 
        protected async Task<bool> SetKengenFuyos(UserModel user)
        {
            var datas = _context.KengenFuyos.Where(x => x.CustomerId == user.CustomerId && x.UserId == user.UserId);
            if(datas == null)
            {
                return false;
            }

            if(user.KengenFuyos != null)
            {
                user.KengenFuyos.Clear();
            }

            foreach(var data in datas)
            {
                var result = await SetKengen(data);

                if (result)
                {
                    user.KengenFuyos.Add(data);
                }
            }

            return true;
        }

        /// <summary>
        /// 権限付与モデルに該当するKengenを設定する
        /// </summary>
        /// 
        /// <param name="kengenFuyo">権限付与モデル</param>
        /// 
        /// <returns>Kengenの存在有無</returns>
        /// 
        protected async Task<bool> SetKengen(KengenFuyoModel kengenFuyo)
        {
            var data = await _context.Kengens.SingleOrDefaultAsync(x => x.KengenId == kengenFuyo.KengenId);
            if (data == null)
            {
                return false;
            }

            kengenFuyo.Kengen = data;

            return true;
        }
    }
}